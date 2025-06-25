import { Chart } from "@/components/ui/chart"

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM carregado, iniciando aplicação...")

  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
      })
    })
  }

  // Initialize charts after a small delay
  setTimeout(() => {
    initializeCharts()
  }, 1000)

  // Initialize comments
  setTimeout(() => {
    initializeComments()
  }, 500)

  // Sistema de comentários simples
  const commentForm = document.getElementById("commentForm")
  const commentsList = document.getElementById("commentsList")

  if (commentForm) {
    commentForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const nameInput = document.getElementById("name")
      const commentInput = document.getElementById("comment")

      const name = nameInput.value.trim() || "Anônimo"
      const text = commentInput.value.trim()

      if (!text) {
        alert("Por favor, escreva um comentário.")
        return
      }

      if (text.length < 10) {
        alert("O comentário deve ter pelo menos 10 caracteres.")
        return
      }

      // Criar novo comentário
      const newComment = document.createElement("div")
      newComment.className = "comment-item"

      const now = new Date()
      const dateStr = now.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      newComment.innerHTML = `
          <div class="comment-header">
              <span class="comment-author">${escapeHtml(name)}</span>
              <span class="comment-date">${dateStr}</span>
          </div>
          <div class="comment-text">${escapeHtml(text)}</div>
      `

      // Adicionar no topo da lista
      commentsList.insertBefore(newComment, commentsList.firstChild)

      // Limpar formulário
      nameInput.value = ""
      commentInput.value = ""

      // Mostrar mensagem de sucesso
      showSuccessMessage()

      // Scroll para o comentário
      newComment.scrollIntoView({ behavior: "smooth" })
    })
  }
})

// Chart initialization
function initializeCharts() {
  console.log("Tentando inicializar gráficos...")

  // Verificar se Chart.js está disponível
  if (typeof Chart === "undefined") {
    console.error("Chart.js não carregou. Verifique a conexão com a internet.")
    // Mostrar mensagem de erro nos containers
    document.querySelectorAll(".chart-container canvas").forEach((canvas) => {
      const container = canvas.parentElement
      container.innerHTML =
        '<div style="padding: 40px; text-align: center; color: #666;">Erro ao carregar gráficos. Verifique sua conexão com a internet.</div>'
    })
    return
  }

  console.log("Chart.js carregado com sucesso!")

  // Chart colors
  const colors = {
    women: "#ec4899", // Pink
    men: "#3b82f6", // Blue
  }

  // 1. Conhecimento sobre ISTs Chart
  const preventionCanvas = document.getElementById("preventionChart")
  if (preventionCanvas) {
    console.log("Criando gráfico 1: Conhecimento sobre ISTs")
    try {
      const preventionCtx = preventionCanvas.getContext("2d")
      new Chart(preventionCtx, {
        type: "bar",
        data: {
          labels: ["Sabem o que é IST", "Não sabem o que é IST"],
          datasets: [
            {
              label: "Mulheres (%)",
              data: [82, 18],
              backgroundColor: colors.women,
              borderColor: colors.women,
              borderWidth: 2,
            },
            {
              label: "Homens (%)",
              data: [74, 26],
              backgroundColor: colors.men,
              borderColor: colors.men,
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: (value) => value + "%",
              },
            },
          },
        },
      })
      console.log("✅ Gráfico 1 criado com sucesso!")
    } catch (error) {
      console.error("❌ Erro ao criar gráfico 1:", error)
    }
  } else {
    console.error("❌ Canvas preventionChart não encontrado")
  }

  // 2. Métodos Anticoncepcionais - Mulheres Chart
  const examsCanvas = document.getElementById("examsChart")
  if (examsCanvas) {
    console.log("Criando gráfico 2: Métodos Anticoncepcionais - Mulheres")
    try {
      const examsCtx = examsCanvas.getContext("2d")
      new Chart(examsCtx, {
        type: "doughnut",
        data: {
          labels: ["Conhecem", "Não conhecem"],
          datasets: [
            {
              data: [89, 11],
              backgroundColor: [colors.women, "rgba(236, 72, 153, 0.3)"],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      })
      console.log("✅ Gráfico 2 criado com sucesso!")
    } catch (error) {
      console.error("❌ Erro ao criar gráfico 2:", error)
    }
  } else {
    console.error("❌ Canvas examsChart não encontrado")
  }

  // 3. Conhecimento de Doenças Chart
  const sourcesCanvas = document.getElementById("sourcesChart")
  if (sourcesCanvas) {
    console.log("Criando gráfico 3: Conhecimento de Doenças")
    try {
      const sourcesCtx = sourcesCanvas.getContext("2d")
      new Chart(sourcesCtx, {
        type: "bar",
        data: {
          labels: ["Conhecem +2 doenças", "Conhecem 1-2", "Não conhecem"],
          datasets: [
            {
              label: "Mulheres (%)",
              data: [68, 25, 7],
              backgroundColor: colors.women,
              borderColor: colors.women,
              borderWidth: 2,
            },
            {
              label: "Homens (%)",
              data: [52, 31, 17],
              backgroundColor: colors.men,
              borderColor: colors.men,
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 80,
              ticks: {
                callback: (value) => value + "%",
              },
            },
          },
        },
      })
      console.log("✅ Gráfico 3 criado com sucesso!")
    } catch (error) {
      console.error("❌ Erro ao criar gráfico 3:", error)
    }
  } else {
    console.error("❌ Canvas sourcesChart não encontrado")
  }

  // 4. Métodos Anticoncepcionais - Homens Chart
  const condomCanvas = document.getElementById("condomChart")
  if (condomCanvas) {
    console.log("Criando gráfico 4: Métodos Anticoncepcionais - Homens")
    try {
      const condomCtx = condomCanvas.getContext("2d")
      new Chart(condomCtx, {
        type: "doughnut",
        data: {
          labels: ["Conhecem", "Não conhecem"],
          datasets: [
            {
              data: [76, 24],
              backgroundColor: [colors.men, "rgba(59, 130, 246, 0.3)"],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      })
      console.log("✅ Gráfico 4 criado com sucesso!")
    } catch (error) {
      console.error("❌ Erro ao criar gráfico 4:", error)
    }
  } else {
    console.error("❌ Canvas condomChart não encontrado")
  }

  console.log("🎉 Todos os gráficos foram processados!")
}

// Comments functionality
function initializeComments() {
  console.log("Inicializando sistema de comentários...")

  // Comentários padrão
  const defaultComments = [
    {
      id: 1,
      author: "Maria Silva",
      text: "Muito obrigada pelas informações! Os gráficos da pesquisa são muito esclarecedores.",
      date: "2024-01-15T10:30:00.000Z",
    },
    {
      id: 2,
      author: "Anônimo",
      text: "Interessante ver as diferenças entre homens e mulheres. Precisamos de mais campanhas educativas.",
      date: "2024-01-10T14:20:00.000Z",
    },
    {
      id: 3,
      author: "João Santos",
      text: "Os dados sobre conhecimento de ISTs me fizeram refletir. Vou buscar mais informações!",
      date: "2024-01-08T16:45:00.000Z",
    },
  ]

  // Carregar comentários
  let comments = []
  try {
    const saved = localStorage.getItem("ist-comments")
    if (saved) {
      comments = JSON.parse(saved)
      console.log("Comentários carregados do localStorage:", comments.length)
    } else {
      comments = defaultComments
      localStorage.setItem("ist-comments", JSON.stringify(comments))
      console.log("Comentários padrão carregados")
    }
  } catch (e) {
    console.log("Erro ao carregar comentários, usando padrão:", e)
    comments = defaultComments
  }

  // Renderizar comentários
  function renderComments() {
    const commentsList = document.getElementById("commentsList")
    if (!commentsList) {
      console.error("Lista de comentários não encontrada")
      return
    }

    if (comments.length === 0) {
      commentsList.innerHTML = `
        <div class="no-comments">
          <p>Ainda não há comentários. Seja o primeiro a comentar!</p>
        </div>
      `
      return
    }

    commentsList.innerHTML = comments
      .map((comment) => {
        const date = new Date(comment.date).toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })

        return `
          <div class="comment-item">
            <div class="comment-header">
              <span class="comment-author">${escapeHtml(comment.author)}</span>
              <span class="comment-date">${date}</span>
            </div>
            <div class="comment-text">${escapeHtml(comment.text)}</div>
          </div>
        `
      })
      .join("")

    console.log("Comentários renderizados:", comments.length)
  }

  // Função para escapar HTML
  function escapeHtml(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }

  // Configurar formulário
  const form = document.getElementById("commentForm")
  const nameInput = document.getElementById("name")
  const commentInput = document.getElementById("comment")

  if (form && nameInput && commentInput) {
    console.log("Configurando formulário de comentários...")

    form.addEventListener("submit", (e) => {
      e.preventDefault()
      console.log("Formulário enviado")

      const name = nameInput.value.trim()
      const text = commentInput.value.trim()

      if (!text) {
        alert("Por favor, escreva um comentário.")
        return
      }

      if (text.length < 10) {
        alert("O comentário deve ter pelo menos 10 caracteres.")
        return
      }

      if (text.length > 500) {
        alert("O comentário deve ter no máximo 500 caracteres.")
        return
      }

      // Mostrar loading
      const submitBtn = form.querySelector(".submit-btn")
      const originalText = submitBtn.textContent
      submitBtn.textContent = "Publicando..."
      submitBtn.disabled = true

      // Simular delay de envio
      setTimeout(() => {
        // Adicionar novo comentário
        const newComment = {
          id: Date.now(),
          author: name || "Anônimo",
          text: text,
          date: new Date().toISOString(),
        }

        comments.unshift(newComment)
        console.log("Novo comentário adicionado:", newComment)

        // Salvar no localStorage
        try {
          localStorage.setItem("ist-comments", JSON.stringify(comments))
          console.log("Comentários salvos no localStorage")
        } catch (e) {
          console.error("Erro ao salvar comentário:", e)
        }

        // Limpar formulário
        nameInput.value = ""
        commentInput.value = ""

        // Restaurar botão
        submitBtn.textContent = originalText
        submitBtn.disabled = false

        // Renderizar comentários
        renderComments()

        // Mostrar mensagem de sucesso
        showSuccessMessage()

        // Scroll para comentários
        const commentsList = document.getElementById("commentsList")
        if (commentsList) {
          commentsList.scrollIntoView({ behavior: "smooth" })
        }
      }, 1000)
    })

    console.log("✅ Formulário de comentários configurado")
  } else {
    console.error("❌ Elementos do formulário não encontrados")
  }

  // Função para mostrar mensagem de sucesso
  function showSuccessMessage() {
    const message = document.createElement("div")
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      z-index: 1001;
      animation: slideIn 0.3s ease-out;
    `
    message.textContent = "Comentário publicado com sucesso!"

    document.body.appendChild(message)

    setTimeout(() => {
      message.style.animation = "slideOut 0.3s ease-in forwards"
      setTimeout(() => {
        if (document.body.contains(message)) {
          document.body.removeChild(message)
        }
      }, 300)
    }, 3000)
  }

  // Renderizar comentários iniciais
  renderComments()

  // Contador de caracteres
  if (commentInput) {
    const maxLength = 500
    const counter = document.createElement("div")
    counter.style.cssText = `
      text-align: right;
      font-size: 0.9rem;
      color: #64748b;
      margin-top: 5px;
    `

    commentInput.parentNode.appendChild(counter)

    function updateCounter() {
      const remaining = maxLength - commentInput.value.length
      counter.textContent = remaining + " caracteres restantes"

      if (remaining < 50) {
        counter.style.color = "#ef4444"
      } else if (remaining < 100) {
        counter.style.color = "#f59e0b"
      } else {
        counter.style.color = "#64748b"
      }
    }

    commentInput.addEventListener("input", updateCounter)
    updateCounter()
  }

  console.log("✅ Sistema de comentários inicializado!")
}

// Adicionar animações CSS
const style = document.createElement("style")
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .no-comments {
    text-align: center;
    padding: 40px;
    color: #64748b;
    font-style: italic;
  }
  
  .success-message {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 1001;
    animation: slideIn 0.3s ease-out;
  }
`
document.head.appendChild(style)

// Smooth scroll para links internos
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})

// Efeito suave no header ao rolar
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (header) {
    if (window.scrollY > 50) {
      header.style.background = "rgba(255, 255, 255, 0.95)"
      header.style.backdropFilter = "blur(10px)"
    } else {
      header.style.background = "#fff"
      header.style.backdropFilter = "none"
    }
  }
})
