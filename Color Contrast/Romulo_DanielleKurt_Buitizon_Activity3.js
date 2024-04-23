const textColor = document.getElementById("textColor");
const bgColor = document.getElementById("bgColor");
const result = document.querySelector(".result");
const contrastRef = document.getElementById("rating");

const textInput = document.getElementById("textInput");

const hexToRGB = (colorValue) => {
    const red = parseInt(colorValue.substring(1, 3), 16);
    const green = parseInt(colorValue.substring(3, 5), 16);
    const blue = parseInt(colorValue.substring(5, 7), 16);
    return [red, green, blue];
};

const getRelativeLuminance = (color) => {
    const sRGB = color.map((val) => {
        const s = val / 255;
        return s < 0.03928 ? s / 12 / 92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
};

const calculateContrastRatio = (color1, color2) => {
    const luminance1 = getRelativeLuminance(color1);
    const luminance2 = getRelativeLuminance(color2);
    const light = Math.max(luminance1, luminance2);
    const dark = Math.min(luminance1, luminance2);
    return (light + 0.05) / (dark + 0.05);
};

const calcRating = (contrastVal) => {
    let rating = "";
    switch (true) {
        case contrastVal > 12:
            rating = "Super";
            contrastRef.style.color = "green";
            break;
        case contrastVal > 7:
            rating = "Very Good";
            contrastRef.style.color = "greenyellow";
            break;
        case contrastVal > 5:
            rating = "Good";
            contrastRef.style.color = "yellow";
            break;
        case contrastVal > 3:
            rating = "Poor";
            contrastRef.style.color = "orange";
            break;
        default:
            rating = "Very Poor";
            contrastRef.style.color = "red";
            break;
    }
    return rating;
};

const contrastChecker = () => {
    const textColorValue = textColor.value;
    const textColorRGBArray = hexToRGB(textColorValue);

    const bgColorValue = bgColor.value;
    const bgColorRGBArray = hexToRGB(bgColorValue);

    const contrast = calculateContrastRatio(textColorRGBArray, bgColorRGBArray);
    contrastRef.innerText = contrast.toFixed(2);
    result.style.color = textColorValue;
    result.style.backgroundColor = bgColorValue;
    result.innerText = textInput.value;
    contrastRef.innerText = calcRating(contrast);
};

textColor.addEventListener("input", contrastChecker);
bgColor.addEventListener("input", contrastChecker);
textInput.addEventListener("input", contrastChecker);
