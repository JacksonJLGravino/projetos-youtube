const REPOS_API_URL = 'https://api.github.com/users/jacksonjlgravino/repos?sort=updated&per_page=100'
const PROFILE_API_URL = 'https://api.github.com/users/jacksonjlgravino'

const menuToggle = document.querySelector('.menu-toggle')
const navMenu = document.getElementById('navMenu')
const navLinks = document.querySelectorAll('.nav-links a')

const projectsContainer = document.getElementById('projectsContainer')
const loadingMessage = document.getElementById('loading-message')
const totalReposElement = document.getElementById('totalReposCount')
const expandButton = document.getElementById('expandProjectsBtn')

const PROJECTS_TO_SHOW_INITIALLY = 6
let allRepositories = []
let isExpanded = false


menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

const truncateText = (text, maxLength = 100) => {
    if (!text) return 'Sem descrição.'
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

const createProjectCard = (repo) => {
    const card = document.createElement('a')
    card.href = repo.html_url
    card.target = "_blank"
    card.classList.add('project-card')
    card.setAttribute('arial-label', `Abrir repositório ${repo.name} no Github`)

    card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${truncateText(repo.description)}</p>
        <div class"repo-info">
            <span><i class="fas fa-code"></i> ${repo.lenguage || 'N/A'}</span>
            <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
        </div>
    `
    return card
}

const renderProjects = (repos, limit, isInitialLoad = false) => {
    projectsContainer.innerHTML = ''
    const reposToDisplay = repos.slice(0, limit)

    if (reposToDisplay.length === 0) {
        projectsContainer.innerHTML = '<p class="error-message>Nenhum projeto público encontrado ou todos são forks.</p>'
        expandButton.style.display = 'none'
        return
    }

    reposToDisplay.forEach(repo => {
        projectsContainer.appendChild(createProjectCard(repo))
    })

    if (repos.length > PROJECTS_TO_SHOW_INITIALLY) {
        expandButton.style.display = 'block'
        if (isExpanded) {
            expandButton.textContent = `Monstrar menos (${PROJECTS_TO_SHOW_INITIALLY}) projetos`

            if (!isInitialLoad) {
                document.getElementById('projetos').scrollIntoView({ behavior: 'smooth' })
            }

        } else {
            const remaining = repos.length - PROJECTS_TO_SHOW_INITIALLY
            expandButton.textContent = `Ver mais projetos (${remaining}) restantes`
        }

    } else {
        expandButton.style.display = 'none'
    }
}

const fetchProfileData = async () => {
    try {
        const response = await fetch(PROFILE_API_URL)
        const data = await response.json()

        if (data.public_repos !== undefined) {
            totalReposElement.textContent = `${data.public_repos} repositórios`
        }
    } catch (error) {
        console.error("Erro ao buscar dados do perfil", error);
        totalReposElement.textContent = "Erro"
    }
}

const fetchProjects = async () => {
    try {
        const response = await fetch(REPOS_API_URL)

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`)
        }

        const repositories = await response.json()
        allRepositories = repositories.filter(repo => !repo.fork)

        if (loadingMessage) {
            loadingMessage.remove()
        }

        renderProjects(allRepositories, PROJECTS_TO_SHOW_INITIALLY, true)

    } catch (error) {
        console.error("Erro ao buscar projetos do GitHub", error)
        projectsContainer.innerHTML = "<p class=error-message>Não foi possível carregar os projetos. Verifique o usuário.</p>"
        expandButton.style.display = 'none'
    }
}

expandButton.addEventListener('click', () => {
    isExpanded = !isExpanded

    if (isExpanded) {
        renderProjects(allRepositories, allRepositories.length)
    } else {
        renderProjects(allRepositories, PROJECTS_TO_SHOW_INITIALLY)
    }
})

fetchProfileData()
fetchProjects()