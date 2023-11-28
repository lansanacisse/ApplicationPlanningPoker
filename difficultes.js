document.addEventListener('DOMContentLoaded', function() {
    let radioButtons = document.querySelectorAll('input[type="radio"]');
    
    radioButtons.forEach(function(radioButton) {
        radioButton.addEventListener('change', function() {

            //Pour faire en sorte que quand on change d'avis, la carte qu'on avait choisi n'est plus selectionee
            document.querySelectorAll('img').forEach(function(img) {
                img.classList.remove('red-background');
            });

            //Si le radio est selectionne on ajoute la classe red-background à la carte (l'element avant le radio du dom)
            if (this.checked) {
                let img = this.previousElementSibling;
                img.classList.add('red-background');
            }
        });
    });
});
