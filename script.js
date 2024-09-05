function calculateIrrigation() {
    // Collect inputs
    const cropType = document.getElementById("cropType").value;
    const soilMoisture = parseFloat(document.getElementById("soilMoisture").value);
    const fieldSize = parseFloat(document.getElementById("fieldSize").value);
    const cropWaterRequirement = parseFloat(document.getElementById("cropWaterRequirement").value);
    const soilType = document.getElementById("soilType").value;
    const irrigationEfficiency = parseFloat(document.getElementById("irrigationEfficiency").value);

    // Crop water requirement based on type of crop
    const waterRequirementFactor = {
        wheat: 5, corn: 6, rice: 7, soybean: 4, cotton: 6,
        potato: 4, sugarcane: 8, tomato: 5, onion: 5, carrot: 4
    };

    // Soil water holding capacity based on soil type
    const soilCapacity = {
        sandy: 0.7, clay: 1.1, loamy: 1.0, silt: 0.9, peat: 0.8
    };

    // Determine if irrigation is needed
    const thresholdMoisture = 60; // assume a threshold of 60% soil moisture
    const irrigationNeeded = soilMoisture < thresholdMoisture;
    
    // Calculate water deficit
    const waterDeficit = irrigationNeeded ? thresholdMoisture - soilMoisture : 0;
    
    // Calculate total water needed in mm
    const totalWaterNeeded = waterDeficit + (cropWaterRequirement * soilCapacity[soilType]);

    // Effective water requirement considering irrigation efficiency
    const effectiveWaterRequirement = totalWaterNeeded / (irrigationEfficiency / 100);

    // Calculate total volume in m³
    const totalVolume = effectiveWaterRequirement * fieldSize * 4046.86 / 1000; // acres to m² and mm to m³

    // Output results
    document.getElementById("irrigationNeeded").textContent = irrigationNeeded ? "Yes" : "No";
    document.getElementById("waterDeficit").textContent = waterDeficit.toFixed(2);
    document.getElementById("totalWaterNeeded").textContent = totalWaterNeeded.toFixed(2);
    document.getElementById("effectiveWaterRequirement").textContent = effectiveWaterRequirement.toFixed(2);
    document.getElementById("totalVolume").textContent = totalVolume.toFixed(2);
}
