const { recupererLesDonnees, afficherTachesEtDifficultes, displayTacheEtDifficulte, initPage } = require('./tache');

// Mocks pour fetch et document.getElementById
global.fetch = jest.fn();
global.document.getElementById = jest.fn();

describe('Tests pour tache.js', () => {
    beforeEach(() => {
        fetch.mockClear();
        document.getElementById.mockClear();
    });

    test('recupererLesDonnees avec données JSON valides', async () => {
        // Simuler une réponse réussie de fetch
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ tache1: 'difficile', tache2: 'facile' })
        });

        // Appel de la fonction et attente de son achèvement
        await recupererLesDonnees();

        // Vérifications
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('votes.json');
    });

    test('recupererLesDonnees gère les exceptions', async () => {
        // Simuler une erreur lors de l'appel à fetch
        fetch.mockRejectedValueOnce(new Error('Erreur de réseau'));

        // Appel de la fonction et attente de son achèvement
        await expect(recupererLesDonnees()).rejects.toThrow('Erreur de réseau');

        // Vérifications supplémentaires
        expect(fetch).toHaveBeenCalledTimes(1);
    });


});
