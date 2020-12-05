/**
 * Copyright (C) SiteVision AB 2002-2017, all rights reserved
 *
 * @author albin
 */
(function() {
   'use strict';

   var registry = {},
      bootstrapData = {},
      initialState = {},
      appStarter;

   function getOrCreateApplicationBase(applicationId) {
      registry[applicationId] = registry[applicationId] || { instances: [], modules: {}, bundle: {} };
      return registry[applicationId];
   }

   document.querySelector('html').classList.add('js');

   var AppRegistry = {

      registerBootstrapData: function(portletId, componentId, componentName, subComponents, options) {
         var portlet = bootstrapData[portletId],
            component;

         if (!portlet) {
            portlet = bootstrapData[portletId] = {};
         }

         component = portlet[componentName];
         if (!component) {
            component = portlet[componentName] = {};
         }

         component[componentId] = {
            subComponents: subComponents,
            options: options
         };
      },

      registerInitialState: function(portletId, data) {
         initialState[portletId] = data;
      },

      registerApp: function(options) {
         var applicationId = options.applicationId,
            application = getOrCreateApplicationBase(applicationId);

         if (appStarter) {
            var registryCopy = {};

            registryCopy[applicationId] = application;
            registryCopy[applicationId].instances = [options];
            appStarter.start(registryCopy);
         } else {
            application.instances.push(options);
         }
      },

      registerModule: function(options) {
         var applicationId = options.applicationId,
            application = getOrCreateApplicationBase(applicationId);

         application.modules[options.path] = options;
      },

      registerBundle: function(options) {
         getOrCreateApplicationBase(options.applicationId).bundle = options.bundle;
      },

      getRegistry: function() {
         return registry;
      },

      setAppStarter: function(starter) {
         appStarter = starter;
      },

      getBootstrapData: function(portletId) {
         return bootstrapData[portletId];
      },

      getInitialState: function(portletId) {
         return initialState[portletId];
      }
   };

   window.AppRegistry = AppRegistry;
}());
