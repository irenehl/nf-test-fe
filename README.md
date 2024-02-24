# Map activities

Map activities provides users with visual insights into various activities recorded within a specified time range. It offers charts displaying total activities, activities by coordinates, and activities by carbon number.

## Summary
- [Features](#features)
- [Map View](#map-view)
- [Total activities chart](#total-activities-chart)
- [Activities by carbon number chart](#activities-by-carbon-number-chart)
- [Activities by coordinates chart](#activities-by-coordinates-chart)
- [Environment](#environment)

## Features

* **Date Selection Form:**
Users can select a start date and an end date to filter activities within that time range. Upon submission, the selected dates are used to fetch data for the charts.

* **Total Activities Chart:**
Displays the overall count of activities recorded within the selected time range. It provides information about the total number of activities, soil percentage, and fertilization percentage.

* **Activities by Coordinates Chart:**
Visualizes the distribution of activities based on their coordinates. It plots the count of activities against different coordinates, allowing users to analyze patterns or hotspots of activities.

* **Activities by Carbon Number Chart:**
Represents the distribution of activities based on their carbon number. It illustrates the count of activities corresponding to different carbon numbers, aiding in understanding the carbon-related aspects of activities.

## Map View

This component offers an interactive map interface for users to add, visualize, and manage activities. It integrates with Mapbox for map rendering and MapboxDraw for drawing features.

### Features

* **Map Interaction:**
Users can interact with the map to draw points or polygons representing activities. They can add carbon data to each drawn feature, indicating relevant information for the activity.

* **Visualization Toggle:**
Users can switch between displaying only points or only polygons on the map, enhancing visualization based on their preferences or analysis needs.


## Total Activities Chart

Visualizes the total count of activities recorded within a specified time range, providing insights into the overall activity volume.

## Activities by Coordinates Chart

Illustrates the distribution of activities based on their geographical coordinates, allowing users to analyze spatial patterns or concentrations of activities.

## Activities by Carbon Number Chart

Visualizes the distribution of activities based on their associated carbon numbers, enabling users to explore carbon-related aspects of recorded activities.

# Environment

| Variables       |
|-------------------|
| VITE_MAPBOX_ACCESS_TOKEN      |
| VITE_API_URL     |
