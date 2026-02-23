'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
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
                    <a href="index.html" data-type="index-link">backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
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
                                    <span class="icon ion-ios-paper"></span>
                                        README
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
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AgendamentoModule.html" data-type="entity-link" >AgendamentoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AgendamentoModule-64ee111d4f2adcd83fc92120c49b59b18c5f1cdf4acdd931013457ebcbf07d404b315f907578976d0415d32b26c664f2a4cfdc79e86727e6d4e3413ec1f0769a"' : 'data-bs-target="#xs-controllers-links-module-AgendamentoModule-64ee111d4f2adcd83fc92120c49b59b18c5f1cdf4acdd931013457ebcbf07d404b315f907578976d0415d32b26c664f2a4cfdc79e86727e6d4e3413ec1f0769a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AgendamentoModule-64ee111d4f2adcd83fc92120c49b59b18c5f1cdf4acdd931013457ebcbf07d404b315f907578976d0415d32b26c664f2a4cfdc79e86727e6d4e3413ec1f0769a"' :
                                            'id="xs-controllers-links-module-AgendamentoModule-64ee111d4f2adcd83fc92120c49b59b18c5f1cdf4acdd931013457ebcbf07d404b315f907578976d0415d32b26c664f2a4cfdc79e86727e6d4e3413ec1f0769a"' }>
                                            <li class="link">
                                                <a href="controllers/AgendamentoController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AgendamentoController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AgendamentoModule-64ee111d4f2adcd83fc92120c49b59b18c5f1cdf4acdd931013457ebcbf07d404b315f907578976d0415d32b26c664f2a4cfdc79e86727e6d4e3413ec1f0769a"' : 'data-bs-target="#xs-injectables-links-module-AgendamentoModule-64ee111d4f2adcd83fc92120c49b59b18c5f1cdf4acdd931013457ebcbf07d404b315f907578976d0415d32b26c664f2a4cfdc79e86727e6d4e3413ec1f0769a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AgendamentoModule-64ee111d4f2adcd83fc92120c49b59b18c5f1cdf4acdd931013457ebcbf07d404b315f907578976d0415d32b26c664f2a4cfdc79e86727e6d4e3413ec1f0769a"' :
                                        'id="xs-injectables-links-module-AgendamentoModule-64ee111d4f2adcd83fc92120c49b59b18c5f1cdf4acdd931013457ebcbf07d404b315f907578976d0415d32b26c664f2a4cfdc79e86727e6d4e3413ec1f0769a"' }>
                                        <li class="link">
                                            <a href="injectables/AgendamentoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AgendamentoService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AgendaModule.html" data-type="entity-link" >AgendaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AgendaModule-1d7b251b656d2189b024c92d8e00dc4e2d6f6ec095a229846370cb691bc0ab0c089784f2446635fb4963c2b7e9feb57372f77b5349fc28db9ab7c9abf9c29654"' : 'data-bs-target="#xs-controllers-links-module-AgendaModule-1d7b251b656d2189b024c92d8e00dc4e2d6f6ec095a229846370cb691bc0ab0c089784f2446635fb4963c2b7e9feb57372f77b5349fc28db9ab7c9abf9c29654"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AgendaModule-1d7b251b656d2189b024c92d8e00dc4e2d6f6ec095a229846370cb691bc0ab0c089784f2446635fb4963c2b7e9feb57372f77b5349fc28db9ab7c9abf9c29654"' :
                                            'id="xs-controllers-links-module-AgendaModule-1d7b251b656d2189b024c92d8e00dc4e2d6f6ec095a229846370cb691bc0ab0c089784f2446635fb4963c2b7e9feb57372f77b5349fc28db9ab7c9abf9c29654"' }>
                                            <li class="link">
                                                <a href="controllers/AgendaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AgendaController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AgendaModule-1d7b251b656d2189b024c92d8e00dc4e2d6f6ec095a229846370cb691bc0ab0c089784f2446635fb4963c2b7e9feb57372f77b5349fc28db9ab7c9abf9c29654"' : 'data-bs-target="#xs-injectables-links-module-AgendaModule-1d7b251b656d2189b024c92d8e00dc4e2d6f6ec095a229846370cb691bc0ab0c089784f2446635fb4963c2b7e9feb57372f77b5349fc28db9ab7c9abf9c29654"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AgendaModule-1d7b251b656d2189b024c92d8e00dc4e2d6f6ec095a229846370cb691bc0ab0c089784f2446635fb4963c2b7e9feb57372f77b5349fc28db9ab7c9abf9c29654"' :
                                        'id="xs-injectables-links-module-AgendaModule-1d7b251b656d2189b024c92d8e00dc4e2d6f6ec095a229846370cb691bc0ab0c089784f2446635fb4963c2b7e9feb57372f77b5349fc28db9ab7c9abf9c29654"' }>
                                        <li class="link">
                                            <a href="injectables/AgendaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AgendaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-5d45a8f52445f8ccdd1f23deac899800117df4a87c9db41c85334a24d2d6613364667389d67ef203141e5b0e0148962b1e5703a70be5a0f787d078ff8aad2922"' : 'data-bs-target="#xs-controllers-links-module-AppModule-5d45a8f52445f8ccdd1f23deac899800117df4a87c9db41c85334a24d2d6613364667389d67ef203141e5b0e0148962b1e5703a70be5a0f787d078ff8aad2922"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-5d45a8f52445f8ccdd1f23deac899800117df4a87c9db41c85334a24d2d6613364667389d67ef203141e5b0e0148962b1e5703a70be5a0f787d078ff8aad2922"' :
                                            'id="xs-controllers-links-module-AppModule-5d45a8f52445f8ccdd1f23deac899800117df4a87c9db41c85334a24d2d6613364667389d67ef203141e5b0e0148962b1e5703a70be5a0f787d078ff8aad2922"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-5d45a8f52445f8ccdd1f23deac899800117df4a87c9db41c85334a24d2d6613364667389d67ef203141e5b0e0148962b1e5703a70be5a0f787d078ff8aad2922"' : 'data-bs-target="#xs-injectables-links-module-AppModule-5d45a8f52445f8ccdd1f23deac899800117df4a87c9db41c85334a24d2d6613364667389d67ef203141e5b0e0148962b1e5703a70be5a0f787d078ff8aad2922"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-5d45a8f52445f8ccdd1f23deac899800117df4a87c9db41c85334a24d2d6613364667389d67ef203141e5b0e0148962b1e5703a70be5a0f787d078ff8aad2922"' :
                                        'id="xs-injectables-links-module-AppModule-5d45a8f52445f8ccdd1f23deac899800117df4a87c9db41c85334a24d2d6613364667389d67ef203141e5b0e0148962b1e5703a70be5a0f787d078ff8aad2922"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-7e1a82cd0a1e3eae3baeb10894e60dddc9d10ebec2a2fad88abb0f6e256d56da6254fd06b27d23e50d112aa3f2dcec24c3ea35c98cbe6487e0cc5887b365642e"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-7e1a82cd0a1e3eae3baeb10894e60dddc9d10ebec2a2fad88abb0f6e256d56da6254fd06b27d23e50d112aa3f2dcec24c3ea35c98cbe6487e0cc5887b365642e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-7e1a82cd0a1e3eae3baeb10894e60dddc9d10ebec2a2fad88abb0f6e256d56da6254fd06b27d23e50d112aa3f2dcec24c3ea35c98cbe6487e0cc5887b365642e"' :
                                            'id="xs-controllers-links-module-AuthModule-7e1a82cd0a1e3eae3baeb10894e60dddc9d10ebec2a2fad88abb0f6e256d56da6254fd06b27d23e50d112aa3f2dcec24c3ea35c98cbe6487e0cc5887b365642e"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-7e1a82cd0a1e3eae3baeb10894e60dddc9d10ebec2a2fad88abb0f6e256d56da6254fd06b27d23e50d112aa3f2dcec24c3ea35c98cbe6487e0cc5887b365642e"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-7e1a82cd0a1e3eae3baeb10894e60dddc9d10ebec2a2fad88abb0f6e256d56da6254fd06b27d23e50d112aa3f2dcec24c3ea35c98cbe6487e0cc5887b365642e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-7e1a82cd0a1e3eae3baeb10894e60dddc9d10ebec2a2fad88abb0f6e256d56da6254fd06b27d23e50d112aa3f2dcec24c3ea35c98cbe6487e0cc5887b365642e"' :
                                        'id="xs-injectables-links-module-AuthModule-7e1a82cd0a1e3eae3baeb10894e60dddc9d10ebec2a2fad88abb0f6e256d56da6254fd06b27d23e50d112aa3f2dcec24c3ea35c98cbe6487e0cc5887b365642e"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EspecialidadeModule.html" data-type="entity-link" >EspecialidadeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EspecialidadeModule-2b33c16aa4954720123f3a5777e8560260a592ce45d73db1f6380d1b76ecc3d68e041c7603841649af66163324c6ddbcf6820579303b3fc5425246815c551f2f"' : 'data-bs-target="#xs-controllers-links-module-EspecialidadeModule-2b33c16aa4954720123f3a5777e8560260a592ce45d73db1f6380d1b76ecc3d68e041c7603841649af66163324c6ddbcf6820579303b3fc5425246815c551f2f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EspecialidadeModule-2b33c16aa4954720123f3a5777e8560260a592ce45d73db1f6380d1b76ecc3d68e041c7603841649af66163324c6ddbcf6820579303b3fc5425246815c551f2f"' :
                                            'id="xs-controllers-links-module-EspecialidadeModule-2b33c16aa4954720123f3a5777e8560260a592ce45d73db1f6380d1b76ecc3d68e041c7603841649af66163324c6ddbcf6820579303b3fc5425246815c551f2f"' }>
                                            <li class="link">
                                                <a href="controllers/EspecialidadeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EspecialidadeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EspecialidadeModule-2b33c16aa4954720123f3a5777e8560260a592ce45d73db1f6380d1b76ecc3d68e041c7603841649af66163324c6ddbcf6820579303b3fc5425246815c551f2f"' : 'data-bs-target="#xs-injectables-links-module-EspecialidadeModule-2b33c16aa4954720123f3a5777e8560260a592ce45d73db1f6380d1b76ecc3d68e041c7603841649af66163324c6ddbcf6820579303b3fc5425246815c551f2f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EspecialidadeModule-2b33c16aa4954720123f3a5777e8560260a592ce45d73db1f6380d1b76ecc3d68e041c7603841649af66163324c6ddbcf6820579303b3fc5425246815c551f2f"' :
                                        'id="xs-injectables-links-module-EspecialidadeModule-2b33c16aa4954720123f3a5777e8560260a592ce45d73db1f6380d1b76ecc3d68e041c7603841649af66163324c6ddbcf6820579303b3fc5425246815c551f2f"' }>
                                        <li class="link">
                                            <a href="injectables/EspecialidadeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EspecialidadeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FuncionariosModule.html" data-type="entity-link" >FuncionariosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FuncionariosModule-acf77c1311f4768f9f367eec6153e10ffa8b3424f3c108004c4f6f85481cc47dbfbdeac80b7f031ed9dcb9c235b6332dcdf9c384712f47e171060d0cb01c50c3"' : 'data-bs-target="#xs-controllers-links-module-FuncionariosModule-acf77c1311f4768f9f367eec6153e10ffa8b3424f3c108004c4f6f85481cc47dbfbdeac80b7f031ed9dcb9c235b6332dcdf9c384712f47e171060d0cb01c50c3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FuncionariosModule-acf77c1311f4768f9f367eec6153e10ffa8b3424f3c108004c4f6f85481cc47dbfbdeac80b7f031ed9dcb9c235b6332dcdf9c384712f47e171060d0cb01c50c3"' :
                                            'id="xs-controllers-links-module-FuncionariosModule-acf77c1311f4768f9f367eec6153e10ffa8b3424f3c108004c4f6f85481cc47dbfbdeac80b7f031ed9dcb9c235b6332dcdf9c384712f47e171060d0cb01c50c3"' }>
                                            <li class="link">
                                                <a href="controllers/FuncionariosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FuncionariosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FuncionariosModule-acf77c1311f4768f9f367eec6153e10ffa8b3424f3c108004c4f6f85481cc47dbfbdeac80b7f031ed9dcb9c235b6332dcdf9c384712f47e171060d0cb01c50c3"' : 'data-bs-target="#xs-injectables-links-module-FuncionariosModule-acf77c1311f4768f9f367eec6153e10ffa8b3424f3c108004c4f6f85481cc47dbfbdeac80b7f031ed9dcb9c235b6332dcdf9c384712f47e171060d0cb01c50c3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FuncionariosModule-acf77c1311f4768f9f367eec6153e10ffa8b3424f3c108004c4f6f85481cc47dbfbdeac80b7f031ed9dcb9c235b6332dcdf9c384712f47e171060d0cb01c50c3"' :
                                        'id="xs-injectables-links-module-FuncionariosModule-acf77c1311f4768f9f367eec6153e10ffa8b3424f3c108004c4f6f85481cc47dbfbdeac80b7f031ed9dcb9c235b6332dcdf9c384712f47e171060d0cb01c50c3"' }>
                                        <li class="link">
                                            <a href="injectables/FuncionarioService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FuncionarioService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MedicoModule.html" data-type="entity-link" >MedicoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MedicoModule-b478314e1a4e6ccdf457a1023b7877d7172c56b23785cfa17716f5e0171278796888e6c86458ded84175fbb21c62ed4a4af04e84506ebf3fb8d1909b44d8bb03"' : 'data-bs-target="#xs-controllers-links-module-MedicoModule-b478314e1a4e6ccdf457a1023b7877d7172c56b23785cfa17716f5e0171278796888e6c86458ded84175fbb21c62ed4a4af04e84506ebf3fb8d1909b44d8bb03"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MedicoModule-b478314e1a4e6ccdf457a1023b7877d7172c56b23785cfa17716f5e0171278796888e6c86458ded84175fbb21c62ed4a4af04e84506ebf3fb8d1909b44d8bb03"' :
                                            'id="xs-controllers-links-module-MedicoModule-b478314e1a4e6ccdf457a1023b7877d7172c56b23785cfa17716f5e0171278796888e6c86458ded84175fbb21c62ed4a4af04e84506ebf3fb8d1909b44d8bb03"' }>
                                            <li class="link">
                                                <a href="controllers/MedicoController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MedicoController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MedicoModule-b478314e1a4e6ccdf457a1023b7877d7172c56b23785cfa17716f5e0171278796888e6c86458ded84175fbb21c62ed4a4af04e84506ebf3fb8d1909b44d8bb03"' : 'data-bs-target="#xs-injectables-links-module-MedicoModule-b478314e1a4e6ccdf457a1023b7877d7172c56b23785cfa17716f5e0171278796888e6c86458ded84175fbb21c62ed4a4af04e84506ebf3fb8d1909b44d8bb03"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MedicoModule-b478314e1a4e6ccdf457a1023b7877d7172c56b23785cfa17716f5e0171278796888e6c86458ded84175fbb21c62ed4a4af04e84506ebf3fb8d1909b44d8bb03"' :
                                        'id="xs-injectables-links-module-MedicoModule-b478314e1a4e6ccdf457a1023b7877d7172c56b23785cfa17716f5e0171278796888e6c86458ded84175fbb21c62ed4a4af04e84506ebf3fb8d1909b44d8bb03"' }>
                                        <li class="link">
                                            <a href="injectables/EspecialidadeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EspecialidadeService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MedicoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MedicoService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PacienteModule.html" data-type="entity-link" >PacienteModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PacienteModule-94b1509fa076cb910d75d5e56a98860e6dbe97ac49254b3e30f7f2a93201b9e0fa5b2060bc45fc9cdc2c19b993cbc95f18a75242248ff23120577b7215b0ebf9"' : 'data-bs-target="#xs-controllers-links-module-PacienteModule-94b1509fa076cb910d75d5e56a98860e6dbe97ac49254b3e30f7f2a93201b9e0fa5b2060bc45fc9cdc2c19b993cbc95f18a75242248ff23120577b7215b0ebf9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PacienteModule-94b1509fa076cb910d75d5e56a98860e6dbe97ac49254b3e30f7f2a93201b9e0fa5b2060bc45fc9cdc2c19b993cbc95f18a75242248ff23120577b7215b0ebf9"' :
                                            'id="xs-controllers-links-module-PacienteModule-94b1509fa076cb910d75d5e56a98860e6dbe97ac49254b3e30f7f2a93201b9e0fa5b2060bc45fc9cdc2c19b993cbc95f18a75242248ff23120577b7215b0ebf9"' }>
                                            <li class="link">
                                                <a href="controllers/PacienteController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PacienteController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PacienteModule-94b1509fa076cb910d75d5e56a98860e6dbe97ac49254b3e30f7f2a93201b9e0fa5b2060bc45fc9cdc2c19b993cbc95f18a75242248ff23120577b7215b0ebf9"' : 'data-bs-target="#xs-injectables-links-module-PacienteModule-94b1509fa076cb910d75d5e56a98860e6dbe97ac49254b3e30f7f2a93201b9e0fa5b2060bc45fc9cdc2c19b993cbc95f18a75242248ff23120577b7215b0ebf9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PacienteModule-94b1509fa076cb910d75d5e56a98860e6dbe97ac49254b3e30f7f2a93201b9e0fa5b2060bc45fc9cdc2c19b993cbc95f18a75242248ff23120577b7215b0ebf9"' :
                                        'id="xs-injectables-links-module-PacienteModule-94b1509fa076cb910d75d5e56a98860e6dbe97ac49254b3e30f7f2a93201b9e0fa5b2060bc45fc9cdc2c19b993cbc95f18a75242248ff23120577b7215b0ebf9"' }>
                                        <li class="link">
                                            <a href="injectables/PacienteService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PacienteService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProntuarioModule.html" data-type="entity-link" >ProntuarioModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProntuarioModule-533a341eb12c0fd9b40c025ffa0d0f0c71d682762dd022904559fedf014ae3a0cfe72377b87dd1f47e3f785a41b9ff6deb66da3e3e87b319174fe4a81d7b112d"' : 'data-bs-target="#xs-controllers-links-module-ProntuarioModule-533a341eb12c0fd9b40c025ffa0d0f0c71d682762dd022904559fedf014ae3a0cfe72377b87dd1f47e3f785a41b9ff6deb66da3e3e87b319174fe4a81d7b112d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProntuarioModule-533a341eb12c0fd9b40c025ffa0d0f0c71d682762dd022904559fedf014ae3a0cfe72377b87dd1f47e3f785a41b9ff6deb66da3e3e87b319174fe4a81d7b112d"' :
                                            'id="xs-controllers-links-module-ProntuarioModule-533a341eb12c0fd9b40c025ffa0d0f0c71d682762dd022904559fedf014ae3a0cfe72377b87dd1f47e3f785a41b9ff6deb66da3e3e87b319174fe4a81d7b112d"' }>
                                            <li class="link">
                                                <a href="controllers/ProntuarioController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProntuarioController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProntuarioModule-533a341eb12c0fd9b40c025ffa0d0f0c71d682762dd022904559fedf014ae3a0cfe72377b87dd1f47e3f785a41b9ff6deb66da3e3e87b319174fe4a81d7b112d"' : 'data-bs-target="#xs-injectables-links-module-ProntuarioModule-533a341eb12c0fd9b40c025ffa0d0f0c71d682762dd022904559fedf014ae3a0cfe72377b87dd1f47e3f785a41b9ff6deb66da3e3e87b319174fe4a81d7b112d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProntuarioModule-533a341eb12c0fd9b40c025ffa0d0f0c71d682762dd022904559fedf014ae3a0cfe72377b87dd1f47e3f785a41b9ff6deb66da3e3e87b319174fe4a81d7b112d"' :
                                        'id="xs-injectables-links-module-ProntuarioModule-533a341eb12c0fd9b40c025ffa0d0f0c71d682762dd022904559fedf014ae3a0cfe72377b87dd1f47e3f785a41b9ff6deb66da3e3e87b319174fe4a81d7b112d"' }>
                                        <li class="link">
                                            <a href="injectables/ProntuarioService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProntuarioService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsuarioModule.html" data-type="entity-link" >UsuarioModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsuarioModule-c26061689c18d2c035367fc73530ee96fed8a99d9438d17ee1a169d9026c3fa50fb358b7e4cbe90e7fb9c3c56899b5d70a55f366b6f324edb7972857696f24ea"' : 'data-bs-target="#xs-controllers-links-module-UsuarioModule-c26061689c18d2c035367fc73530ee96fed8a99d9438d17ee1a169d9026c3fa50fb358b7e4cbe90e7fb9c3c56899b5d70a55f366b6f324edb7972857696f24ea"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsuarioModule-c26061689c18d2c035367fc73530ee96fed8a99d9438d17ee1a169d9026c3fa50fb358b7e4cbe90e7fb9c3c56899b5d70a55f366b6f324edb7972857696f24ea"' :
                                            'id="xs-controllers-links-module-UsuarioModule-c26061689c18d2c035367fc73530ee96fed8a99d9438d17ee1a169d9026c3fa50fb358b7e4cbe90e7fb9c3c56899b5d70a55f366b6f324edb7972857696f24ea"' }>
                                            <li class="link">
                                                <a href="controllers/UsuarioController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsuarioController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsuarioModule-c26061689c18d2c035367fc73530ee96fed8a99d9438d17ee1a169d9026c3fa50fb358b7e4cbe90e7fb9c3c56899b5d70a55f366b6f324edb7972857696f24ea"' : 'data-bs-target="#xs-injectables-links-module-UsuarioModule-c26061689c18d2c035367fc73530ee96fed8a99d9438d17ee1a169d9026c3fa50fb358b7e4cbe90e7fb9c3c56899b5d70a55f366b6f324edb7972857696f24ea"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsuarioModule-c26061689c18d2c035367fc73530ee96fed8a99d9438d17ee1a169d9026c3fa50fb358b7e4cbe90e7fb9c3c56899b5d70a55f366b6f324edb7972857696f24ea"' :
                                        'id="xs-injectables-links-module-UsuarioModule-c26061689c18d2c035367fc73530ee96fed8a99d9438d17ee1a169d9026c3fa50fb358b7e4cbe90e7fb9c3c56899b5d70a55f366b6f324edb7972857696f24ea"' }>
                                        <li class="link">
                                            <a href="injectables/UsuarioService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsuarioService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Agenda.html" data-type="entity-link" >Agenda</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Agendamento.html" data-type="entity-link" >Agendamento</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Especialidade.html" data-type="entity-link" >Especialidade</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Funcionario.html" data-type="entity-link" >Funcionario</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Medico.html" data-type="entity-link" >Medico</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Paciente.html" data-type="entity-link" >Paciente</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Prontuario.html" data-type="entity-link" >Prontuario</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Usuario.html" data-type="entity-link" >Usuario</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Agenda.html" data-type="entity-link" >Agenda</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAgendaDto.html" data-type="entity-link" >CreateAgendaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAgendamentoDto.html" data-type="entity-link" >CreateAgendamentoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEspecialidadeDto.html" data-type="entity-link" >CreateEspecialidadeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFuncionarioDto.html" data-type="entity-link" >CreateFuncionarioDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMedicoDto.html" data-type="entity-link" >CreateMedicoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePacienteDto.html" data-type="entity-link" >CreatePacienteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProntuarioDto.html" data-type="entity-link" >CreateProntuarioDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUsuarioDto.html" data-type="entity-link" >CreateUsuarioDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MeusBagos.html" data-type="entity-link" >MeusBagos</a>
                            </li>
                            <li class="link">
                                <a href="classes/New1764443733911.html" data-type="entity-link" >New1764443733911</a>
                            </li>
                            <li class="link">
                                <a href="classes/Seedespecialidades1764444224257.html" data-type="entity-link" >Seedespecialidades1764444224257</a>
                            </li>
                            <li class="link">
                                <a href="classes/Seedmedicos1764444358103.html" data-type="entity-link" >Seedmedicos1764444358103</a>
                            </li>
                            <li class="link">
                                <a href="classes/SeedUsuarios1764444421022.html" data-type="entity-link" >SeedUsuarios1764444421022</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAgendaDataDto.html" data-type="entity-link" >UpdateAgendaDataDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAgendaDto.html" data-type="entity-link" >UpdateAgendaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAgendamentoDto.html" data-type="entity-link" >UpdateAgendamentoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAgendaStatusDto.html" data-type="entity-link" >UpdateAgendaStatusDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFuncionarioDto.html" data-type="entity-link" >UpdateFuncionarioDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMedicoDto.html" data-type="entity-link" >UpdateMedicoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePacienteDto.html" data-type="entity-link" >UpdatePacienteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProntuarioDto.html" data-type="entity-link" >UpdateProntuarioDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
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
});