const app = {
    user: null,
    projects: [
        { id: 1, title: "Kelebek Etkisi Mekanizması", likes: 250, isLiked: false, video: "video1.mp4" },
        { id: 2, title: "Elma Soyma Robotu", likes: 110, isLiked: false, video: "video2.mp4" }
    ],

    init() {
        this.render(this.projects);
        document.getElementById('searchInput').addEventListener('input', (e) => {
            const filtered = this.projects.filter(p => p.title.toLowerCase().includes(e.target.value.toLowerCase()));
            this.render(filtered);
        });
    },

    login() {
        this.user = prompt("Kullanıcı adın:");
        if(this.user) document.getElementById('user-zone').innerHTML = `<span>Merhaba, ${this.user}</span>`;
    },

    toggleLike(id) {
        const p = this.projects.find(x => x.id === id);
        p.isLiked ? (p.likes--, p.isLiked = false) : (p.likes++, p.isLiked = true);
        this.render(this.projects);
    },

    render(data) {
        const feed = document.getElementById('feed');
        if (data.length === 0) {
            feed.innerHTML = '<h2 style="margin-top:100px;">Video Yok</h2>';
            return;
        }
        feed.innerHTML = data.map(p => `
            <div class="card">
                <video src="${p.video}" autoplay loop muted></video>
                <h3>${p.title}</h3>
                <div class="actions">
                    <button class="btn ${p.isLiked ? 'liked' : ''}" onclick="app.toggleLike(${p.id})">
                        ${p.isLiked ? 'Beğenildi' : 'Beğen'} (${p.likes})
                    </button>
                </div>
            </div>
        `).join('');
    }
};

app.init();
