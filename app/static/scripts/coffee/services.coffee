'use strict'

###
  @Services
###

# Demonstrate how to register services
# In this case it is a simple value service.
myApp = angular.module('myApp.services', [])

myApp.value('version', '0.1')
