import { ajoutParticipants } from './accueil';

// Mock pour document.querySelector et document.getElementById
document.querySelector = jest.fn();
document.getElementById = jest.fn();

describe('Tests pour accueil.js', () => {
    beforeEach(() => {
        document.querySelector.mockClear();
        document.getElementById.mockClear();
    });

    test('ajoutParticipants avec méthode de vote et nombre de participants', () => {
        // Configurez les mocks pour simuler les valeurs retournées par le DOM
        document.querySelector.mockReturnValue({ value: 'A' });
        document.getElementById.mockReturnValueOnce({ value: 5 })
                        .mockReturnValueOnce({ innerHTML: '' });

        // Testez la fonction ajoutParticipants
        const result = ajoutParticipants();
        expect(result).toBe(/* résultat attendu, par exemple true ou un objet spécifique */);
        // Ajoutez d'autres assertions pour vérifier les manipulations du DOM ou du localStorage
    });

    test('ajoutParticipants gère les exceptions', () => {
        // Configurez les mocks pour simuler une situation qui provoquerait une exception
        document.querySelector.mockReturnValue({ value: null });
        document.getElementById.mockReturnValue({ value: null });

        expect(() => {
            ajoutParticipants();
        }).toThrow();
    });
});
