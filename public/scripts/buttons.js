const copyLinkButton = document.getElementById('copy');

copyLinkButton.addEventListener('click', () => {
	navigator.clipboard.writeText(window.location.origin + window.location.pathname);
});