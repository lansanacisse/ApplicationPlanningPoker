import {initPage, fondRouge, reinitialiser_formulaire, tourParticipant, traitementParticipant, } from '/difficultes.js';
import {displayParticipant, displayTache, stocker, parole_moyenne, initPage} from '/difficultes.js';

describe('Tests pour difficultes.js', () => {
    test('initPage avec méthode de vote spécifiée', () => {

    });

    test('initPage gère les exceptions', () => {

        expect(() => {
            initPage();
        }).toThrow();
    });
});

