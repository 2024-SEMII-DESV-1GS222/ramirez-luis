export class Ability {
    constructor(name, learners) {
        this.name = name;
        this.learners = learners;
    }

    capitalizeName() {
        return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }

    getHTMLRepresentation() {
        return `
            <div class="ability-info">
                <h3 class="ability-title">${this.capitalizeName()}</h3>
                <div class="ability-content">
                    <p class="p-ability"><strong>Who can learn it?</strong></p>
                    <ul class="ability-learners">
                        ${this.learners.map(learner => `
                            <li>
                                ${learner.name}
                                ${learner.isHidden ? '<span class="hidden-ability-indicator">👁️</span>' : ''}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
    }
}