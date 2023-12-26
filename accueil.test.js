const { ajoutParticipants } = require('./accueil');

// Mock pour document.querySelector et document.getElementById
document.querySelector = jest.fn();
document.getElementById = jest.fn();

describe('Tests pour accueil.js', () => {
    beforeEach(() => {
        // Réinitialiser les mocks avant chaque test
        document.querySelector.mockClear();
        document.getElementById.mockClear();
    });

    test('ajoutParticipants avec méthode de vote et nombre de participants', () => {
        // Configurer les mocks pour simuler les valeurs retournées par le DOM
        document.querySelector.mockReturnValue({ value: 'A' });
        document.getElementById.mockReturnValueOnce({ value: 5 })
                        .mockReturnValueOnce({ innerHTML: '' });

        // Tester la fonction ajoutParticipants
        const result = ajoutParticipants();

        // Remplacer par le résultat attendu
        expect(result).toBe(/* résultat attendu, par exemple true ou un objet spécifique */);

        // Ajouter des assertions supplémentaires si nécessaire
        // Par exemple, vérifier si le DOM a été mis à jour correctement
    });

    test('ajoutParticipants gère les exceptions', () => {
        // Configurer les mocks pour simuler une situation qui provoquerait une exception
        document.querySelector.mockReturnValue({ value: null });
        document.getElementById.mockReturnValue({ value: null });

        // Tester la gestion des exceptions dans ajoutParticipants
        expect(() => {
            ajoutParticipants();
        }).toThrow();
    });

});
