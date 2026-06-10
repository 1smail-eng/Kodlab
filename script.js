document.querySelectorAll('.like-btn').forEach(button => {
    button.addEventListener('click', () => {
        button.style.backgroundColor = '#00ff66';
        button.innerText = '❤️ Beğenildi';
    });
});
