// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })

  // Close menu when clicking on a link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
    })
  })
})

// Comments functionality
class CommentsManager {
  constructor() {
    this.comments = this.loadComments()
    this.init()
  }

  init() {
    this.renderComments()
    this.setupForm()
  }

  loadComments() {
    const saved = localStorage.getItem("ist-comments")
    if (saved) {
      return JSON.parse(saved)
    }

    // Comentários iniciais de exemplo
    return [
      {
        id: 1,
        author: "Maria Silva",
        text: "Muito obrigada pelas informações! Finalmente entendi melhor sobre a importância dos exames regulares.",
        date: new Date("2024-01-15").toISOString(),
      },
      {
        id: 2,
        author: "Anônimo",
        text: "Gostaria de saber mais sobre onde posso fazer exames gratuitos na minha cidade.",
        date: new Date("2024-01-10").toISOString(),
      },
      {
        id: 3,
        author: "João Santos",
        text: "Site muito esclarecedor! Vou compartilhar com meus amigos. Informação de qualidade salva vidas.",
        date: new Date("2024-01-08").toISOString(),
      },
    ]
  }

  saveComments() {
    localStorage.setItem("ist-comments", JSON.stringify(this.comments))
  }

  addComment(author, text) {
    const newComment = {
      id: Date.now(),
      author: author || "Anônimo",
      text: text,
      date: new Date().toISOString(),
    }

    this.comments.unshift(newComment)
    this.saveComments()
    this.renderComments()
  }

  formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  renderComments() {
    const commentsList = document.getElementById("commentsList")

    if (this.comments.length === 0) {
      commentsList.innerHTML = `
                <div class="no-comments">
                    <p>Ainda não há comentários. Seja o primeiro a comentar!</p>
                </div>
            `
      return
    }

    commentsList.innerHTML = this.comments
      .map(
        (comment) => `
            <div class="comment-item">
                <div class="comment-header">
                    <span class="comment-author">${this.escapeHtml(comment.author)}</span>
                    <span class="comment-date">${this.formatDate(comment.date)}</span>
                </div>
                <div class="comment-text">${this.escapeHtml(comment.text)}</div>
            </div>
        `,
      )
      .join("")
  }

  escapeHtml(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }

  setupForm() {
    const form = document.getElementById("commentForm")
    const nameInput = document.getElementById("name")
    const commentInput = document.getElementById("comment")

    form.addEventListener("submit", (e) => {
      e.preventDefault()

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
        this.addComment(name, text)

        // Limpar formulário
        nameInput.value = ""
        commentInput.value = ""

        // Restaurar botão
        submitBtn.textContent = originalText
        submitBtn.disabled = false

        // Scroll para o novo comentário
        document.getElementById("commentsList").scrollIntoView({
          behavior: "smooth",
        })

        // Mostrar mensagem de sucesso
        this.showSuccessMessage()
      }, 1000)
    })
  }

  showSuccessMessage() {
    const message = document.createElement("div")
    message.className = "success-message"
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
        document.body.removeChild(message)
      }, 300)
    }, 3000)
  }
}

// Adicionar animações CSS para as mensagens
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
`
document.head.appendChild(style)

// Inicializar o sistema de comentários
const commentsManager = new CommentsManager()

// Smooth scroll para links internos
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

// Efeito suave no header ao rolar
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 50) {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.backdropFilter = "blur(10px)"
  } else {
    header.style.background = "#fff"
    header.style.backdropFilter = "none"
  }
})

// Contador de caracteres para o textarea
document.addEventListener("DOMContentLoaded", () => {
  const textarea = document.getElementById("comment")
  const maxLength = 500

  // Criar contador
  const counter = document.createElement("div")
  counter.style.cssText = `
        text-align: right;
        font-size: 0.9rem;
        color: #64748b;
        margin-top: 5px;
    `

  textarea.parentNode.appendChild(counter)

  function updateCounter() {
    const remaining = maxLength - textarea.value.length
    counter.textContent = `${remaining} caracteres restantes`

    if (remaining < 50) {
      counter.style.color = "#ef4444"
    } else if (remaining < 100) {
      counter.style.color = "#f59e0b"
    } else {
      counter.style.color = "#64748b"
    }
  }

  textarea.addEventListener("input", updateCounter)
  updateCounter() // Inicializar
})
