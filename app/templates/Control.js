/*!
 * ${copyright}
 */

// Provides control ui5lab.wordcloud.WordCloud.
sap.ui.define(['jquery.sap.global', './library', 'sap/ui/core/Control'], function(
    jQuery,
    library,
    Control
) {
    'use strict';

    /**
     * Constructor for a new <%= libraryName %>.<%= controlName %> control.
     *
     * @param {string} [sId] id for the new control, generated automatically if no id is given
     * @param {object} [mSettings] initial settings for the new control
     *
     * @class
     *
     * @extends sap.ui.core.Control
     *
     * @public
     * @alias <%= libraryName %>.<%= controlName %>
     */
    var oControl = Control.extend(
        '<%= libraryName %>.<%= controlName %>',
        /** @lends <%= libraryName %>.<%= controlName %>.prototype */

        {
            /**
             * Control API
             */
            metadata: {
                library: '<%= libraryName %>',
                properties: {
                    text: {
                        type: 'string',
                        defaultValue: 'Hello, UI5Lab!',
                    },
                },
            },

            /**
             * Lifecycle hook to initialize the control
             */
            init: function() {
                // nothing yet
            },
        }
    );

    return oControl;
});
