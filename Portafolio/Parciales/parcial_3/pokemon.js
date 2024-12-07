export class Pokemon {
  constructor(name, id, frontSprite, backSprite, weight, height, evolutionChain, abilities) {
      this.name = name;
      this.id = id;
      this.frontSprite = frontSprite;
      this.backSprite = backSprite;
      this.weight = weight;
      this.height = height;
      this.evolutionChain = evolutionChain;
      this.abilities = abilities;
  }

  capitalizeName() {
      return this.name.charAt(0).toUpperCase() + this.name.slice(1);
  }

  getHTMLRepresentation() {
      return `
          <h3 class="pokemon-title">${this.capitalizeName()} (${this.id})</h3>
          <div class="main-info">
              <div class="info-column">
                  <div class="sprite-group">
                      <p><strong>Sprites:</strong></p>
                      <div class="sprites">
                          <img src="${this.frontSprite}" alt="${this.name} frente">
                          <img src="${this.backSprite}" alt="${this.name} atrás">
                      </div>
                  </div>
                  <div class="weight-height-group">
                      <p><strong>Weight/Height</strong></p>
                      <div class="weight-height-values">
                          <p>${this.weight} / ${this.height}</p>
                      </div>
                  </div>
              </div>
              <div class="info-column">
                  <div class="evolution-group">
                      <p><strong>Evolution chain:</strong></p>
                      <ul class="evolution-list">
                          ${this.evolutionChain.map(evo => `
                              <li>
                                  ${this.capitalizeWord(evo.name)}
                                  ${evo.isBaby ? '👶' : ''}
                              </li>
                          `).join('')}
                      </ul>
                  </div>
                  <div class="abilities-group">
                      <p><strong>Abilities:</strong></p>
                      <ul class="abilities-list">
                          ${this.abilities.map(ability => `
                              <li>
                                  ${this.capitalizeWord(ability.name)}
                                  ${ability.isHidden ? '👁️' : ''}
                              </li>
                          `).join('')}
                      </ul>
                  </div>
              </div>
          </div>
      `;
  }

  capitalizeWord(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
  }
}