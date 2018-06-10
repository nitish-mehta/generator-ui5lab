/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library <%= libraryName %>
 */
sap.ui.define(['jquery.sap.global', 'sap/ui/core/library'], function(jQuery, library1) {
    'use strict';

    /**
     * @namespace
     * @name <%= libraryName %>
     * @public
     */

    // library dependencies

    // delegate further initialization of this library to the Core
    sap.ui.getCore().initLibrary({
        name: '<%= libraryName %>',
        dependencies: ['sap.ui.core'],
        interfaces: [],
        controls: ['<%= libraryName %>.<%= controlName %>'],
        elements: [],
        noLibraryCSS: false,
        version: '${version}',
    });

    return <%= libraryName %>;
});
