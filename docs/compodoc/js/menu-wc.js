'use strict';

customElements.define(
  'compodoc-menu',
  class extends HTMLElement {
    constructor() {
      super();
      this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
      this.render(this.isNormalMode);
    }

    render(isNormalMode) {
      let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ntua-saas-10 documentation</a>
                </li>

                <li class="divider"></li>
                ${
                  isNormalMode
                    ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>`
                    : ''
                }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${
                              isNormalMode
                                ? 'data-bs-target="#modules-links"'
                                : 'data-bs-target="#xs-modules-links"'
                            }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${
                          isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"'
                        }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-AppModule-e60c640f0c7145f290392a1f253cb748efe58ab9f41b0dd0ede08816c748d8785b29426141a34f28a7cd473cc29aa145198fd9a5f8dd0b31fc18363e569b3fd9-3"'
                                            : 'data-bs-target="#xs-controllers-links-module-AppModule-e60c640f0c7145f290392a1f253cb748efe58ab9f41b0dd0ede08816c748d8785b29426141a34f28a7cd473cc29aa145198fd9a5f8dd0b31fc18363e569b3fd9-3"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-AppModule-e60c640f0c7145f290392a1f253cb748efe58ab9f41b0dd0ede08816c748d8785b29426141a34f28a7cd473cc29aa145198fd9a5f8dd0b31fc18363e569b3fd9-3"'
                                            : 'id="xs-controllers-links-module-AppModule-e60c640f0c7145f290392a1f253cb748efe58ab9f41b0dd0ede08816c748d8785b29426141a34f28a7cd473cc29aa145198fd9a5f8dd0b31fc18363e569b3fd9-3"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/I18nStreamController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >I18nStreamController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-AppModule-e60c640f0c7145f290392a1f253cb748efe58ab9f41b0dd0ede08816c748d8785b29426141a34f28a7cd473cc29aa145198fd9a5f8dd0b31fc18363e569b3fd9-3"'
                                        : 'data-bs-target="#xs-injectables-links-module-AppModule-e60c640f0c7145f290392a1f253cb748efe58ab9f41b0dd0ede08816c748d8785b29426141a34f28a7cd473cc29aa145198fd9a5f8dd0b31fc18363e569b3fd9-3"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-AppModule-e60c640f0c7145f290392a1f253cb748efe58ab9f41b0dd0ede08816c748d8785b29426141a34f28a7cd473cc29aa145198fd9a5f8dd0b31fc18363e569b3fd9-3"'
                                        : 'id="xs-injectables-links-module-AppModule-e60c640f0c7145f290392a1f253cb748efe58ab9f41b0dd0ede08816c748d8785b29426141a34f28a7cd473cc29aa145198fd9a5f8dd0b31fc18363e569b3fd9-3"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/I18nStreamService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >I18nStreamService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DatafilesModule.html" data-type="entity-link" >DatafilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-DatafilesModule-d92867cbf5363ce185b0433da4f46b6068e2b0e0fc1b7ceaa9ef400146e1a03afaf3c5a38ee0ddbf3e741c55b2af6c01bf884232ab2c8314fc91b9caf4c65dcd"'
                                            : 'data-bs-target="#xs-controllers-links-module-DatafilesModule-d92867cbf5363ce185b0433da4f46b6068e2b0e0fc1b7ceaa9ef400146e1a03afaf3c5a38ee0ddbf3e741c55b2af6c01bf884232ab2c8314fc91b9caf4c65dcd"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-DatafilesModule-d92867cbf5363ce185b0433da4f46b6068e2b0e0fc1b7ceaa9ef400146e1a03afaf3c5a38ee0ddbf3e741c55b2af6c01bf884232ab2c8314fc91b9caf4c65dcd"'
                                            : 'id="xs-controllers-links-module-DatafilesModule-d92867cbf5363ce185b0433da4f46b6068e2b0e0fc1b7ceaa9ef400146e1a03afaf3c5a38ee0ddbf3e741c55b2af6c01bf884232ab2c8314fc91b9caf4c65dcd"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/DatafilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatafilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-DatafilesModule-d92867cbf5363ce185b0433da4f46b6068e2b0e0fc1b7ceaa9ef400146e1a03afaf3c5a38ee0ddbf3e741c55b2af6c01bf884232ab2c8314fc91b9caf4c65dcd"'
                                        : 'data-bs-target="#xs-injectables-links-module-DatafilesModule-d92867cbf5363ce185b0433da4f46b6068e2b0e0fc1b7ceaa9ef400146e1a03afaf3c5a38ee0ddbf3e741c55b2af6c01bf884232ab2c8314fc91b9caf4c65dcd"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-DatafilesModule-d92867cbf5363ce185b0433da4f46b6068e2b0e0fc1b7ceaa9ef400146e1a03afaf3c5a38ee0ddbf3e741c55b2af6c01bf884232ab2c8314fc91b9caf4c65dcd"'
                                        : 'id="xs-injectables-links-module-DatafilesModule-d92867cbf5363ce185b0433da4f46b6068e2b0e0fc1b7ceaa9ef400146e1a03afaf3c5a38ee0ddbf3e741c55b2af6c01bf884232ab2c8314fc91b9caf4c65dcd"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/DatafilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatafilesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FilenameService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilenameService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NotificationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/I18nStreamModule.html" data-type="entity-link" >I18nStreamModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-I18nStreamModule-c6494ffab04e93c0096ef533958e85ec327babc4b9c312a9eac954a302433612dbfb3dabb5e9cf915983a9faa01fcbf03e85a6dca975a364e9201f7fd8a527da"'
                                            : 'data-bs-target="#xs-controllers-links-module-I18nStreamModule-c6494ffab04e93c0096ef533958e85ec327babc4b9c312a9eac954a302433612dbfb3dabb5e9cf915983a9faa01fcbf03e85a6dca975a364e9201f7fd8a527da"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-I18nStreamModule-c6494ffab04e93c0096ef533958e85ec327babc4b9c312a9eac954a302433612dbfb3dabb5e9cf915983a9faa01fcbf03e85a6dca975a364e9201f7fd8a527da"'
                                            : 'id="xs-controllers-links-module-I18nStreamModule-c6494ffab04e93c0096ef533958e85ec327babc4b9c312a9eac954a302433612dbfb3dabb5e9cf915983a9faa01fcbf03e85a6dca975a364e9201f7fd8a527da"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/I18nStreamController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >I18nStreamController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-I18nStreamModule-c6494ffab04e93c0096ef533958e85ec327babc4b9c312a9eac954a302433612dbfb3dabb5e9cf915983a9faa01fcbf03e85a6dca975a364e9201f7fd8a527da"'
                                        : 'data-bs-target="#xs-injectables-links-module-I18nStreamModule-c6494ffab04e93c0096ef533958e85ec327babc4b9c312a9eac954a302433612dbfb3dabb5e9cf915983a9faa01fcbf03e85a6dca975a364e9201f7fd8a527da"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-I18nStreamModule-c6494ffab04e93c0096ef533958e85ec327babc4b9c312a9eac954a302433612dbfb3dabb5e9cf915983a9faa01fcbf03e85a6dca975a364e9201f7fd8a527da"'
                                        : 'id="xs-injectables-links-module-I18nStreamModule-c6494ffab04e93c0096ef533958e85ec327babc4b9c312a9eac954a302433612dbfb3dabb5e9cf915983a9faa01fcbf03e85a6dca975a364e9201f7fd8a527da"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/I18nStreamService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >I18nStreamService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RenderModule.html" data-type="entity-link" >RenderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-RenderModule-8f1a1b1fca96f2e7d437835fc612bc0420b8cd22511e7f170785035aa979d2a91a557b13a6160a6fc4e6f3d3c2bd4cfb73dc352db34918f5cabb17ce65b51cf0"'
                                            : 'data-bs-target="#xs-controllers-links-module-RenderModule-8f1a1b1fca96f2e7d437835fc612bc0420b8cd22511e7f170785035aa979d2a91a557b13a6160a6fc4e6f3d3c2bd4cfb73dc352db34918f5cabb17ce65b51cf0"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-RenderModule-8f1a1b1fca96f2e7d437835fc612bc0420b8cd22511e7f170785035aa979d2a91a557b13a6160a6fc4e6f3d3c2bd4cfb73dc352db34918f5cabb17ce65b51cf0"'
                                            : 'id="xs-controllers-links-module-RenderModule-8f1a1b1fca96f2e7d437835fc612bc0420b8cd22511e7f170785035aa979d2a91a557b13a6160a6fc4e6f3d3c2bd4cfb73dc352db34918f5cabb17ce65b51cf0"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/RenderController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RenderController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-RenderModule-8f1a1b1fca96f2e7d437835fc612bc0420b8cd22511e7f170785035aa979d2a91a557b13a6160a6fc4e6f3d3c2bd4cfb73dc352db34918f5cabb17ce65b51cf0"'
                                        : 'data-bs-target="#xs-injectables-links-module-RenderModule-8f1a1b1fca96f2e7d437835fc612bc0420b8cd22511e7f170785035aa979d2a91a557b13a6160a6fc4e6f3d3c2bd4cfb73dc352db34918f5cabb17ce65b51cf0"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-RenderModule-8f1a1b1fca96f2e7d437835fc612bc0420b8cd22511e7f170785035aa979d2a91a557b13a6160a6fc4e6f3d3c2bd4cfb73dc352db34918f5cabb17ce65b51cf0"'
                                        : 'id="xs-injectables-links-module-RenderModule-8f1a1b1fca96f2e7d437835fc612bc0420b8cd22511e7f170785035aa979d2a91a557b13a6160a6fc4e6f3d3c2bd4cfb73dc352db34918f5cabb17ce65b51cf0"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/ChartConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartConfigService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DatafilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatafilesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RenderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RenderService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ServerNestClusterModule.html" data-type="entity-link" >ServerNestClusterModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-ServerNestClusterModule-763af46e83e46c25520a92d14db67d6f06fea43428e65102d234e6047fb19f81d21b4ebba63002d31ecc989b3ba4651b74ac69a93f41046599298bd53ef95176"'
                                        : 'data-bs-target="#xs-injectables-links-module-ServerNestClusterModule-763af46e83e46c25520a92d14db67d6f06fea43428e65102d234e6047fb19f81d21b4ebba63002d31ecc989b3ba4651b74ac69a93f41046599298bd53ef95176"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-ServerNestClusterModule-763af46e83e46c25520a92d14db67d6f06fea43428e65102d234e6047fb19f81d21b4ebba63002d31ecc989b3ba4651b74ac69a93f41046599298bd53ef95176"'
                                        : 'id="xs-injectables-links-module-ServerNestClusterModule-763af46e83e46c25520a92d14db67d6f06fea43428e65102d234e6047fb19f81d21b4ebba63002d31ecc989b3ba4651b74ac69a93f41046599298bd53ef95176"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/ClusterModule.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClusterModule</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TransactionModule.html" data-type="entity-link" >TransactionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-TransactionModule-df3e45db3d12c30ce460640d6d816edc4d2e65602b4de84ad5633ffeda25a96474adbb6478b2a199426e848455a50f808c8cd02e0ae07a9531bd7994071ddd7f"'
                                            : 'data-bs-target="#xs-controllers-links-module-TransactionModule-df3e45db3d12c30ce460640d6d816edc4d2e65602b4de84ad5633ffeda25a96474adbb6478b2a199426e848455a50f808c8cd02e0ae07a9531bd7994071ddd7f"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-TransactionModule-df3e45db3d12c30ce460640d6d816edc4d2e65602b4de84ad5633ffeda25a96474adbb6478b2a199426e848455a50f808c8cd02e0ae07a9531bd7994071ddd7f"'
                                            : 'id="xs-controllers-links-module-TransactionModule-df3e45db3d12c30ce460640d6d816edc4d2e65602b4de84ad5633ffeda25a96474adbb6478b2a199426e848455a50f808c8cd02e0ae07a9531bd7994071ddd7f"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/TransactionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-TransactionModule-df3e45db3d12c30ce460640d6d816edc4d2e65602b4de84ad5633ffeda25a96474adbb6478b2a199426e848455a50f808c8cd02e0ae07a9531bd7994071ddd7f"'
                                        : 'data-bs-target="#xs-injectables-links-module-TransactionModule-df3e45db3d12c30ce460640d6d816edc4d2e65602b4de84ad5633ffeda25a96474adbb6478b2a199426e848455a50f808c8cd02e0ae07a9531bd7994071ddd7f"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-TransactionModule-df3e45db3d12c30ce460640d6d816edc4d2e65602b4de84ad5633ffeda25a96474adbb6478b2a199426e848455a50f808c8cd02e0ae07a9531bd7994071ddd7f"'
                                        : 'id="xs-injectables-links-module-TransactionModule-df3e45db3d12c30ce460640d6d816edc4d2e65602b4de84ad5633ffeda25a96474adbb6478b2a199426e848455a50f808c8cd02e0ae07a9531bd7994071ddd7f"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/ChartConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartConfigService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DatafilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatafilesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TransactionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-UsersModule-3147cbc32077bcc943f6d65f5466f006256e8593d23dd33698fe0097320428c9ffb30fe4795c81c334d96a2867891c7bbc958bbf0cb7278e6f3f02121558573c"'
                                            : 'data-bs-target="#xs-controllers-links-module-UsersModule-3147cbc32077bcc943f6d65f5466f006256e8593d23dd33698fe0097320428c9ffb30fe4795c81c334d96a2867891c7bbc958bbf0cb7278e6f3f02121558573c"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-UsersModule-3147cbc32077bcc943f6d65f5466f006256e8593d23dd33698fe0097320428c9ffb30fe4795c81c334d96a2867891c7bbc958bbf0cb7278e6f3f02121558573c"'
                                            : 'id="xs-controllers-links-module-UsersModule-3147cbc32077bcc943f6d65f5466f006256e8593d23dd33698fe0097320428c9ffb30fe4795c81c334d96a2867891c7bbc958bbf0cb7278e6f3f02121558573c"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-UsersModule-3147cbc32077bcc943f6d65f5466f006256e8593d23dd33698fe0097320428c9ffb30fe4795c81c334d96a2867891c7bbc958bbf0cb7278e6f3f02121558573c"'
                                        : 'data-bs-target="#xs-injectables-links-module-UsersModule-3147cbc32077bcc943f6d65f5466f006256e8593d23dd33698fe0097320428c9ffb30fe4795c81c334d96a2867891c7bbc958bbf0cb7278e6f3f02121558573c"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-UsersModule-3147cbc32077bcc943f6d65f5466f006256e8593d23dd33698fe0097320428c9ffb30fe4795c81c334d96a2867891c7bbc958bbf0cb7278e6f3f02121558573c"'
                                        : 'id="xs-injectables-links-module-UsersModule-3147cbc32077bcc943f6d65f5466f006256e8593d23dd33698fe0097320428c9ffb30fe4795c81c334d96a2867891c7bbc958bbf0cb7278e6f3f02121558573c"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ValidationModule.html" data-type="entity-link" >ValidationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-ValidationModule-3128670118ea03a7bfbd00140cd77426c8dfc4bca279674aa83aa9e484e95ccbcd12c4b668c8c5e939908a33d649eed14bedc9bfb39eaec67ee90358120605ae"'
                                            : 'data-bs-target="#xs-controllers-links-module-ValidationModule-3128670118ea03a7bfbd00140cd77426c8dfc4bca279674aa83aa9e484e95ccbcd12c4b668c8c5e939908a33d649eed14bedc9bfb39eaec67ee90358120605ae"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-ValidationModule-3128670118ea03a7bfbd00140cd77426c8dfc4bca279674aa83aa9e484e95ccbcd12c4b668c8c5e939908a33d649eed14bedc9bfb39eaec67ee90358120605ae"'
                                            : 'id="xs-controllers-links-module-ValidationModule-3128670118ea03a7bfbd00140cd77426c8dfc4bca279674aa83aa9e484e95ccbcd12c4b668c8c5e939908a33d649eed14bedc9bfb39eaec67ee90358120605ae"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/ValidationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ValidationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-ValidationModule-3128670118ea03a7bfbd00140cd77426c8dfc4bca279674aa83aa9e484e95ccbcd12c4b668c8c5e939908a33d649eed14bedc9bfb39eaec67ee90358120605ae"'
                                        : 'data-bs-target="#xs-injectables-links-module-ValidationModule-3128670118ea03a7bfbd00140cd77426c8dfc4bca279674aa83aa9e484e95ccbcd12c4b668c8c5e939908a33d649eed14bedc9bfb39eaec67ee90358120605ae"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-ValidationModule-3128670118ea03a7bfbd00140cd77426c8dfc4bca279674aa83aa9e484e95ccbcd12c4b668c8c5e939908a33d649eed14bedc9bfb39eaec67ee90358120605ae"'
                                        : 'id="xs-injectables-links-module-ValidationModule-3128670118ea03a7bfbd00140cd77426c8dfc4bca279674aa83aa9e484e95ccbcd12c4b668c8c5e939908a33d649eed14bedc9bfb39eaec67ee90358120605ae"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/ChartConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartConfigService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DatafilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatafilesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NotificationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ValidationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ValidationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                          isNormalMode
                            ? 'data-bs-target="#classes-links"'
                            : 'data-bs-target="#xs-classes-links"'
                        }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${
                          isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"'
                        }>
                            <li class="link">
                                <a href="classes/AbstractDocument.html" data-type="entity-link" >AbstractDocument</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractRepository.html" data-type="entity-link" >AbstractRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApiSDK.html" data-type="entity-link" >ApiSDK</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteDatafileRequestDto.html" data-type="entity-link" >DeleteDatafileRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteDatafileResponseDto.html" data-type="entity-link" >DeleteDatafileResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FirebaseAdmin.html" data-type="entity-link" >FirebaseAdmin</a>
                            </li>
                            <li class="link">
                                <a href="classes/FirebaseWeb.html" data-type="entity-link" >FirebaseWeb</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersDto.html" data-type="entity-link" >GetUsersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/I18nStreamDto.html" data-type="entity-link" >I18nStreamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RenderChartConfigRequestDto.html" data-type="entity-link" >RenderChartConfigRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TransactionRequestDto.html" data-type="entity-link" >TransactionRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UploadDatafileRequestDto.html" data-type="entity-link" >UploadDatafileRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UploadDatafileResponseDto.html" data-type="entity-link" >UploadDatafileResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link" >UserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRepository.html" data-type="entity-link" >UserRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidateDatafileRequestDto.html" data-type="entity-link" >ValidateDatafileRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidateDatafileResponseDto.html" data-type="entity-link" >ValidateDatafileResponseDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                              isNormalMode
                                ? 'data-bs-target="#injectables-links"'
                                : 'data-bs-target="#xs-injectables-links"'
                            }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${
                              isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"'
                            }>
                                <li class="link">
                                    <a href="injectables/ChartConfigService.html" data-type="entity-link" >ChartConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilenameService.html" data-type="entity-link" >FilenameService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseAuthMiddleware.html" data-type="entity-link" >FirebaseAuthMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationsService.html" data-type="entity-link" >NotificationsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                          isNormalMode
                            ? 'data-bs-target="#interfaces-links"'
                            : 'data-bs-target="#xs-interfaces-links"'
                        }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${
                          isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"'
                        }>
                            <li class="link">
                                <a href="interfaces/ApiSDKConfig.html" data-type="entity-link" >ApiSDKConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppRoutes.html" data-type="entity-link" >AppRoutes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthRequest.html" data-type="entity-link" >AuthRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthResponse.html" data-type="entity-link" >AuthResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BuyCreditsFormProps.html" data-type="entity-link" >BuyCreditsFormProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CallOptions.html" data-type="entity-link" >CallOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChangeLanguageProps.html" data-type="entity-link" >ChangeLanguageProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChartPreviewProps.html" data-type="entity-link" >ChartPreviewProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CrudResourceGenConfig.html" data-type="entity-link" >CrudResourceGenConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebaseAdminConstructorConfig.html" data-type="entity-link" >FirebaseAdminConstructorConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I18nStreamModuleOptions.html" data-type="entity-link" >I18nStreamModuleOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFeatureModel.html" data-type="entity-link" >IFeatureModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtCustomClaims.html" data-type="entity-link" >JwtCustomClaims</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Render.html" data-type="entity-link" >Render</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RenderMetadata.html" data-type="entity-link" >RenderMetadata</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RenderParams.html" data-type="entity-link" >RenderParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Resource.html" data-type="entity-link" >Resource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResourceDeleted.html" data-type="entity-link" >ResourceDeleted</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResourceGenConfig.html" data-type="entity-link" >ResourceGenConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SignUpFormSpecs.html" data-type="entity-link" >SignUpFormSpecs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SignUpProps.html" data-type="entity-link" >SignUpProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpinnerButtonProps.html" data-type="entity-link" >SpinnerButtonProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ToastMessageProps.html" data-type="entity-link" >ToastMessageProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ToolbarProps.html" data-type="entity-link" >ToolbarProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UiButtonProps.html" data-type="entity-link" >UiButtonProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UiCardProps.html" data-type="entity-link" >UiCardProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UiHeaderProps.html" data-type="entity-link" >UiHeaderProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UploadCsvChartFileProps.html" data-type="entity-link" >UploadCsvChartFileProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UploadFileSchemaOptions.html" data-type="entity-link" >UploadFileSchemaOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UploadWizardFormData.html" data-type="entity-link" >UploadWizardFormData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UploadWizardProps.html" data-type="entity-link" >UploadWizardProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UploadWizardRef.html" data-type="entity-link" >UploadWizardRef</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UseHookFormProps.html" data-type="entity-link" >UseHookFormProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserDocument.html" data-type="entity-link" >UserDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UseReactMutation.html" data-type="entity-link" >UseReactMutation</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                          isNormalMode
                            ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"'
                        }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${
                          isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"'
                        }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
      this.innerHTML = tp.strings;
    }
  },
);
