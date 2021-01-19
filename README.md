# leaflet-challenge
<h3>Earthquakes around the World</h3>

!["USGS"](https://github.com/timsamson/leaflet-challenge/blob/main/Images/USGS.png)

<p>The United States Geological Survey, or USGS fis responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. This visualization maps and helps to visualize earthquake data from around the world. </p>
<p>In Step-1 a simple visualization is offered which maps and colors the quakes based on thier coordinates and magnitude.</p>
<p>
A more comprehensive visualtion is offered in step two which allows you to select your base map from 4 available options and also select your layers showing techtonic plates, earthquakes or both. In Step 2 in addition to the markers showing the location and magnitude of the quakes, the opacity of the color within the circle also coorelates to teh depth of the quake. (a lighter or paler color indicating a shallow quake).</p>
<p>
Click on the makers in either activity for more in depth data visualized as a pop-up. </p>

<br>
<h3>Example Visualizations</h3>
<h4>Step 1 Map Visualization</h4>

!["Step 1 Map Visualization"](https://github.com/timsamson/leaflet-challenge/blob/main/Images/Step_1.png)

<h4>Step 2 Map Visualization</h4>

!["Step 2 Map Visualization"](https://github.com/timsamson/leaflet-challenge/blob/main/Images/Step_2_wo_popup.png)

<h4>Step 2 Satallite Map Visualization</h4>

!["Step 2 Satallite Map Visualization"](https://github.com/timsamson/leaflet-challenge/blob/main/Images/Step_2_Sat_w_popup.png)

<h4>Step 2 Dark Map Visualization</h4>

!["Step 2 Dark Map Visualization"](https://github.com/timsamson/leaflet-challenge/blob/main/Images/Step_2_dark_w_popup.png)

<br>
<h3>File Structure</h3>
<p>There are 3 folders within the repository:
    <ul><li>Leaflet=Step-1 
        <ul><li>static</li>
            <li>css- contains css file</li>
            <li>js- Contains 2 files: </li>
                <ul><li> config.js - for API keu for mapbox</li>
                    <li> logic.js - logic coding for visualization</li></ul></ul></li>
    <li>Leaflet-Step-2</li>
            <ul><li>static</li>
            <li>css- contains css file</li>
            <li>js- Contains 2 files: </li>
                <ul><li> config.js - for API keu for mapbox</li>
                    <li> logic.js - logic coding for visualization</li></ul></ul></li>
    <li>Images- contains example visualiations</li></ul>
</p>
<br>
<h3>Using the Visualization</h3>
<ol><li><p>Clone Repo</a></p></li>
<li>BEFORE YOU RUN THIS CODE: In the config.js file in either of the two js folders, you will need to add your MapBox API key, and save the file"</li>
<li><p>Open repo and activate local server.
</p></li>
<li><p>Navigate in browser window to index.html for the respective visualization you wish to view. (Either Step-1 or Step-2)</p></li>
<li><p>For Step 1</p>
<ul><li>View the Data on the Map, Legend coorosponds to magnitude level.</li></ul></li>
</li>


<li><p>For Step 2</p>Advanced Control Options for map.<ul>
<li>To use: From the Layer Select menu in the upper right hand corner select one base layer and one or both overlays.</li><br>
<li>Base Layer Options:<ul><li>Street View</li><li>Satellite</li><li>Dark Map</li><li>Outdoor Map</li></ul></li><br>
<li>Overlay Options:<ul><li>Earthquakes</li><li>Techtonic Plates</li></ul></li>
</li></ol>
<br>

<h3>Dependencies</h3>
 <ul>
<li>HTML</li>
<li>Leafly</li>
<li>D3</li>
<li>JavaScript</li>
</ul>
