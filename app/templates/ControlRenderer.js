/*!
 * ${copyright}
 */

sap.ui.define([],
    function() {
        "use strict";

        /**
         * Renderer for Word Cloud
         * @namespace
         */
        var <%= controlName %>Renderer = {};

        /**
         * Renders the HTML for the control, using the provided {@link sap.ui.core.RenderManager}.
         *
         * @param {sap.ui.core.RenderManager} oRm RenderManager object
         * @param {sap.ui.core.Control} oControl An object representation of the control that will be rendered
         */
        <%= controlName %>Renderer.render = function(oRm, oControl) {

            oRm.write("<div");
            oRm.writeControlData(oControl);

            // Generic library+control class
            oRm.addClass("<%= libraryNameOnly %>-<%= controlName %>");

            oRm.writeClasses();
            // oRm.addStyle("width", oControl.getWidth());
            // oRm.addStyle("height", oControl.getHeight());
            oRm.writeStyles();

            oRm.write(">");

            oRm.write(oControl.getText());

            oRm.write("</div>");
        };

        return <%= controlName %>Renderer;

    }, /* bExport= */ true);