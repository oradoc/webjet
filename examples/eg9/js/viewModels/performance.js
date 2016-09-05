/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your viewModel code goes here
 */
 define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojchart'],
 function(oj, ko, $)
 {
     function ChartModel() {
         var self = this;

         /* chart data */
         var barSeries = [{name: "Series 1", items: [42, 34]},
                          {name: "Series 2", items: [55, 30]},
                          {name: "Series 3", items: [36, 50]},
                          {name: "Series 4", items: [22, 46]},
                          {name: "Series 5", items: [22, 46]}];

         var barGroups = ["Group A", "Group B"];

         self.barSeriesValue = ko.observableArray(barSeries);
         self.barGroupsValue = ko.observableArray(barGroups);
     }

     return ChartModel;
 });
