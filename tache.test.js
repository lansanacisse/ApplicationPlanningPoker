const { recupererLesDonnees, afficherTachesEtDifficultes, displayTacheEtDifficulte, initPage } = require('./tache');

// Mock global pour fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ /* Données JSON simulées */ })
    })
);

// Mock pour document.getElementById
global.document.getElementById = jest.fn();

describe('Tests pour tache.js', () => {
    beforeEach(() => {
        fetch.mockClear();
        document.getElementById.mockClear();
    });

    test('recupererLesDonnees avec données JSON valides', async () => {
        await recupererLesDonnees();
        // Ajoutez vos assertions ici pour vérifier le comportement attendu
    });

    test('recupererLesDonnees gère les exceptions', async () => {
        fetch.mockImplementationOnce(() => Promise.reject(new Error('Erreur de réseau')));
        await expect(recupererLesDonnees()).rejects.toThrow('Erreur de réseau');
    });

    test('afficherTachesEtDifficultes affiche correctement les données', () => {
        const fakeData = { /* Données simulées */ };
        document.getElementById.mockReturnValue({ innerHTML: '' });
        afficherTachesEtDifficultes(fakeData);
        // Ajoutez vos assertions ici pour vérifier que les données sont affichées correctement
    });

    test('displayTacheEtDifficulte affiche correctement une tâche et une difficulté', () => {
        const fakeData = { /* Données de tâche et difficulté simulées */ };
        document.getElementById.mockReturnValue({ innerHTML: '' });
        displayTacheEtDifficulte(fakeData);
        // Ajoutez vos assertions ici pour vérifier l'affichage correct
    });

    test('initPage initialise correctement la page', () => {
        // Mockez toutes les fonctions ou manipulations du DOM nécessaires
        initPage();

    });
});
