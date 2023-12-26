const fs = require('fs');
const { chargerFichierJson, fichierJsonExiste, chargerDonnees, afficherPageDifficultes, afficherAlerte } = require('./continuer_partie');

// Mock pour fs.existsSync et autres interactions avec le système de fichiers
jest.mock('fs');

// Mock des fonctions internes si elles interagissent avec des systèmes externes
jest.mock('./continuer_partie', () => ({
    chargerDonnees: jest.fn(),
    afficherPageDifficultes: jest.fn(),
    afficherAlerte: jest.fn(),
    // Assurez-vous d'inclure les autres fonctions exportées ici si nécessaire
}));

describe('Tests pour continuer_partie.js', () => {
    beforeEach(() => {
        // Réinitialiser les mocks avant chaque test
        fs.existsSync.mockClear();
        chargerDonnees.mockClear();
        afficherPageDifficultes.mockClear();
        afficherAlerte.mockClear();
    });

    test('chargerFichierJson avec fichier JSON existant', () => {
        fs.existsSync.mockReturnValue(true);

        chargerFichierJson();

        // Vérifiez que chargerDonnees et afficherPageDifficultes ont été appelées
        expect(chargerDonnees).toHaveBeenCalled();
        expect(afficherPageDifficultes).toHaveBeenCalled();
    });

    test('chargerFichierJson gère les exceptions', () => {
        fs.existsSync.mockImplementation(() => {
            throw new Error('Erreur système de fichiers');
        });

        expect(() => {
            chargerFichierJson();
        }).toThrow('Erreur système de fichiers');
    });
});
