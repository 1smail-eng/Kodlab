const app = {
    // Merkezi Veri Kaynağı (Veritabanına dönüşecek)
    projects: [
        { id: 1, title: "Servo Robot Kol", likes: 250, parts: ["Arduino", "SG90"], comments: ["Harika!", "Motor tipi ne?"], video: "https://www.w3schools.com/html/mov_bbb.mp4" },
        { id: 2, title: "ESP32 Akıllı Ev", likes: 110, parts: ["ESP32", "DHT11"], comments: ["Çok temiz iş."], video: "https://www.w3schools.com/html/movie.mp4" }
    ],

    init() {
        this.render(this.projects);
        document.getElementById('search').addEventListener('input', (e) => this.filterProjects(e.target.value));
    },

    render(data) {
        const container = document.getElementById('feed-container');
        container.innerHTML = data.map(p => `
            <div class="card">
                <video src="${p.video}" loop autoplay muted></video>
                <div class="details">
                    <h3>${p.title}</h3>
                    <div class="interaction">
                        <button class="btn" onclick="app.like(${p.id})">❤️ ${p.likes}</button>
                        <button class="btn" onclick="app.showParts('${p.parts.join(', ')}')">🛠 Parçalar</button>
                        <button class="btn" onclick="app.addComment(${p.id})">💬 Yorumla</button>
                    </div>
                    <div class="comment-list" id="comments-${p.id}">
                        ${p.comments.map(c => `<p>• ${c}</p>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    },

    like(id) {
        const p = this.projects.find(x => x.id === id);
        p.likes++;
        this.render(this.projects);
    },

    addComment(id) {
        const comment = prompt("Yorumunu yaz:");
        if (comment) {
            this.projects.find(x => x.id === id).comments.push(comment);
            this.render(this.projects);
        }
    },

    showParts(parts) {
        alert("Gerekli Malzemeler: " + parts);
    },

    filterProjects(query) {
        const filtered = this.projects.filter(p => 
            p.title.toLowerCase().includes(query.toLowerCase()) || 
            p.parts.join(', ').toLowerCase().includes(query.toLowerCase())
        );
        this.render(filtered);
    }
};

app.init();
