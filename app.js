(() => {
  "use strict";

  const PREVIEW_MAX_EDGE = 1200;
  const photoInput = document.getElementById("photoInput");
  const logoInput = document.getElementById("logoInput");
  const previewCanvas = document.getElementById("previewCanvas");
  const previewStage = document.getElementById("previewStage");
  const templateGrid = document.getElementById("templateGrid");
  const statusText = document.getElementById("statusText");
  const downloadButton = document.getElementById("downloadButton");
  const changePhotoButton = document.getElementById("changePhotoButton");
  const changeLogoButton = document.getElementById("changeLogoButton");
  const uploadButton = document.getElementById("uploadButton");
  const mobileUploadButton = document.getElementById("mobileUploadButton");
  const logoToggle = document.getElementById("logoToggle");
  const exifToggle = document.getElementById("exifToggle");
  const paletteToggle = document.getElementById("paletteToggle");

  const state = {
    photo: null,
    photoName: "",
    photoUrl: null,
    logo: null,
    logoUrl: null,
    templateId: 1,
    showLogo: true,
    showExif: true,
    showPalette: true,
    exif: {},
    palette: []
  };

  const defaultLogo = new Image();
  defaultLogo.src = "data:image/png;base64,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";
  defaultLogo.onload = () => {
    if (state.photo) render();
  };

  function setStatus(message, isError) {
    statusText.textContent = message;
    statusText.classList.toggle("error", Boolean(isError));
  }

  function roundLayout(value) {
    const floor = Math.floor(value);
    const fraction = value - floor;
    if (Math.abs(fraction - .5) < 1e-8) return floor % 2 === 0 ? floor : floor + 1;
    return Math.round(value);
  }

  function previewPhotoSize() {
    const sourceWidth = state.photo.naturalWidth || state.photo.width;
    const sourceHeight = state.photo.naturalHeight || state.photo.height;
    const scale = Math.min(1, PREVIEW_MAX_EDGE / Math.max(sourceWidth, sourceHeight));
    return { width: roundLayout(sourceWidth * scale), height: roundLayout(sourceHeight * scale) };
  }

  function createLayout(templateId) {
    const source = previewPhotoSize();
    const shortEdge = Math.min(source.width, source.height);
    const classic = templateId <= 2;
    const sharedModern = templateId >= 4;
    const leftBorder = Math.max(24, roundLayout(shortEdge * .05));
    const rightBorder = classic ? leftBorder : Math.max(24, roundLayout(shortEdge * .05125));
    const topBorder = classic ? leftBorder : sharedModern ? Math.max(24, roundLayout(shortEdge * .1036)) : Math.max(24, roundLayout(shortEdge * .0518));
    const bottomBorder = classic
      ? Math.max(roundLayout(shortEdge * .2), leftBorder * 3)
      : sharedModern
        ? Math.max(roundLayout(shortEdge * .1489), leftBorder * 2)
        : Math.max(roundLayout(shortEdge * .20065), leftBorder * 3);
    const paperWidth = source.width + leftBorder + rightBorder;
    const paperHeight = source.height + topBorder + bottomBorder;
    const outer = classic
      ? { left: Math.max(32, roundLayout(shortEdge * .07)), right: Math.max(32, roundLayout(shortEdge * .07)), top: Math.max(32, roundLayout(shortEdge * .07)), bottom: Math.max(32, roundLayout(shortEdge * .07)) }
      : { left: Math.max(32, roundLayout(shortEdge * .2747)), right: Math.max(32, roundLayout(shortEdge * .2692)), top: Math.max(32, roundLayout(shortEdge * .0831)), bottom: Math.max(32, roundLayout(shortEdge * .0891)) };
    const paperX = outer.left;
    const paperY = outer.top;
    return {
      templateId, shortEdge, leftBorder, rightBorder, topBorder, bottomBorder, paperWidth, paperHeight,
      paperX, paperY, canvasWidth: paperWidth + outer.left + outer.right, canvasHeight: paperHeight + outer.top + outer.bottom,
      photoX: paperX + leftBorder, photoY: paperY + topBorder, photoWidth: source.width, photoHeight: source.height,
      infoStartY: paperY + topBorder + source.height
    };
  }

  function setCanvasSize(layout) {
    previewCanvas.width = layout.canvasWidth;
    previewCanvas.height = layout.canvasHeight;
  }

  function drawCover(context, image, x, y, width, height) {
    const sourceWidth = image.naturalWidth || image.width;
    const sourceHeight = image.naturalHeight || image.height;
    const sourceRatio = sourceWidth / sourceHeight;
    const targetRatio = width / height;
    let sx = 0;
    let sy = 0;
    let sw = sourceWidth;
    let sh = sourceHeight;

    if (sourceRatio > targetRatio) {
      sw = sourceHeight * targetRatio;
      sx = (sourceWidth - sw) / 2;
    } else {
      sh = sourceWidth / targetRatio;
      sy = (sourceHeight - sh) / 2;
    }

    context.drawImage(image, sx, sy, sw, sh, x, y, width, height);
  }

  function drawBlurredBackground(context, width, height, opacity, blurRadius) {
    context.save();
    context.filter = "blur(" + blurRadius + "px) brightness(.62)";
    drawCover(context, state.photo, -blurRadius, -blurRadius, width + blurRadius * 2, height + blurRadius * 2);
    context.restore();
    context.fillStyle = "rgba(30, 29, 26, " + opacity + ")";
    context.fillRect(0, 0, width, height);
  }

  function drawCard(context, x, y, width, height, color) {
    context.save();
    context.shadowColor = "rgba(0,0,0,.30)";
    context.shadowBlur = 30;
    context.shadowOffsetY = 14;
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
    context.restore();
  }

  function formatNumber(value, digits) {
    if (!Number.isFinite(value)) return "";
    return Number(value.toFixed(digits || 1)).toString();
  }

  function exposureText(value) {
    if (!Number.isFinite(value) || value <= 0) return "";
    if (value < 1) return "1/" + Math.round(1 / value);
    return formatNumber(value, 1) + "s";
  }

  function exifText() {
    const parts = [];
    if (state.exif.focalLength) parts.push(formatNumber(state.exif.focalLength, 0) + "mm");
    if (state.exif.fNumber) parts.push("f/" + formatNumber(state.exif.fNumber, 1));
    if (state.exif.exposureTime) parts.push(exposureText(state.exif.exposureTime));
    if (state.exif.iso) parts.push("ISO" + state.exif.iso);
    return parts.length ? parts.join("  ") : "原图信息不可用";
  }

  function hasExifInfo(exif) {
    return Boolean(exif.focalLength || exif.fNumber || exif.exposureTime || exif.iso);
  }

  function drawLogo(context, layout, topY) {
    if (!state.showLogo) return;
    const logoSizeHint = Math.max(28, roundLayout(layout.shortEdge * .048));
    const maxLogoWidth = Math.min(layout.paperWidth * .23, Math.max(logoSizeHint * 4, 80));

    if (state.logo || (defaultLogo.complete && defaultLogo.naturalWidth > 0)) {
      const logo = state.logo || defaultLogo;
      const logoWidthSource = logo.naturalWidth || logo.width;
      const logoHeightSource = logo.naturalHeight || logo.height;
      const ratio = logoWidthSource / logoHeightSource;
      const logoWidth = Math.min(maxLogoWidth, logoWidthSource);
      const logoHeight = logoWidth / ratio;
      context.drawImage(logo, layout.paperX + (layout.paperWidth - logoWidth) / 2, topY, logoWidth, logoHeight);
      return logoHeight;
    }

    context.save();
    context.fillStyle = "#202020";
    context.textAlign = "center";
    context.font = "700 " + Math.max(16, roundLayout(layout.shortEdge * .028)) + "px Arial, sans-serif";
    context.fillText("LIGHT FRAME", layout.paperX + layout.paperWidth / 2, topY + 18);
    context.restore();
    return Math.max(22, roundLayout(layout.shortEdge * .035));
  }

  function drawExif(context, layout, baseY, color) {
    if (!state.showExif) return;
    context.save();
    context.fillStyle = color;
    context.textAlign = "center";
    context.font = Math.max(16, roundLayout(layout.shortEdge * .02)) + "px Arial, sans-serif";
    context.fillText(exifText(), layout.paperX + layout.paperWidth / 2, baseY);
    context.restore();
  }

  function drawPalette(context, layout, y, outlineColor) {
    if (!state.showPalette) return;
    const colors = state.palette.length ? state.palette : ["#182a2d", "#56483d", "#b29c83", "#7d5c47", "#f3f0e9"];
    const box = Math.max(16, roundLayout(layout.shortEdge * .024));
    const gap = Math.max(5, roundLayout(layout.shortEdge * .012));
    const width = colors.length * box + (colors.length - 1) * gap;
    let x = layout.paperX + layout.paperWidth - layout.rightBorder - width;

    colors.slice(0, 5).forEach((color) => {
      context.fillStyle = color;
      context.fillRect(x, y, box, box);
      context.strokeStyle = outlineColor;
      context.lineWidth = Math.max(1, roundLayout(layout.shortEdge * .0005));
      context.strokeRect(x, y, box, box);
      x += box + gap;
    });
  }

  function drawWhiteTemplate(context, layout) {
    const isDarkStage = layout.templateId === 2;
    context.fillStyle = isDarkStage ? "#151311" : "#f7f7f7";
    context.fillRect(0, 0, layout.canvasWidth, layout.canvasHeight);
    context.save();
    context.shadowColor = isDarkStage ? "rgba(255,255,255,.62)" : "rgba(0,0,0,.31)";
    context.shadowBlur = Math.max(8, roundLayout(layout.shortEdge * (isDarkStage ? .018 : .018)));
    context.shadowOffsetY = isDarkStage ? 0 : Math.max(3, roundLayout(layout.shortEdge * .006));
    context.fillStyle = "#ffffff";
    context.fillRect(layout.paperX, layout.paperY, layout.paperWidth, layout.paperHeight);
    if (isDarkStage) {
      context.shadowColor = "transparent";
      context.strokeStyle = "#151311";
      context.lineWidth = Math.max(1, roundLayout(layout.shortEdge * .001));
      context.strokeRect(layout.paperX, layout.paperY, layout.paperWidth, layout.paperHeight);
    }
    context.restore();
    context.drawImage(state.photo, layout.photoX, layout.photoY, layout.photoWidth, layout.photoHeight);
    const logoY = layout.infoStartY + roundLayout(layout.bottomBorder * .27);
    const logoHeight = drawLogo(context, layout, logoY) || 0;
    const captionY = Math.min(layout.infoStartY + roundLayout(layout.bottomBorder * .70), logoY + logoHeight + roundLayout(layout.bottomBorder * .12));
    drawExif(context, layout, captionY, "#202020");
    drawPalette(context, layout, layout.infoStartY + roundLayout(layout.bottomBorder * .27), "#222222");
  }

  function drawBlurTemplate(context, layout) {
    const isGlass = layout.templateId === 5 || layout.templateId === 6;
    drawBlurredBackground(context, layout.canvasWidth, layout.canvasHeight, layout.templateId === 6 ? .30 : .42, Math.max(10, roundLayout(layout.shortEdge * .016)));
    if (isGlass) {
      context.fillStyle = "rgba(255,255,255,.15)";
      context.fillRect(layout.paperX, layout.paperY, layout.paperWidth, layout.paperHeight);
      context.strokeStyle = "rgba(255,255,255,.86)";
      context.lineWidth = Math.max(1, roundLayout(layout.shortEdge * .001));
      context.strokeRect(layout.paperX, layout.paperY, layout.paperWidth, layout.paperHeight);
    } else {
      drawCard(context, layout.paperX, layout.paperY, layout.paperWidth, layout.paperHeight, "#ffffff");
    }
    context.drawImage(state.photo, layout.photoX, layout.photoY, layout.photoWidth, layout.photoHeight);
    const textColor = layout.templateId === 5 ? "#ffffff" : "#202020";
    const outlineColor = layout.templateId === 5 ? "#ffffff" : "#222222";
    if (layout.templateId === 3) {
      const logoY = layout.infoStartY + roundLayout(layout.bottomBorder * .27);
      const logoHeight = drawLogo(context, layout, logoY) || 0;
      const captionY = Math.min(layout.infoStartY + roundLayout(layout.bottomBorder * .70), logoY + logoHeight + roundLayout(layout.bottomBorder * .12));
      drawExif(context, layout, captionY, textColor);
      drawPalette(context, layout, layout.infoStartY + roundLayout(layout.bottomBorder * .14), outlineColor);
      return;
    }
    drawLogo(context, layout, layout.paperY + roundLayout(layout.shortEdge * .0315));
    const fontSize = Math.max(16, roundLayout(layout.shortEdge * .02));
    drawExif(context, layout, layout.infoStartY + layout.bottomBorder / 2 + fontSize * .35, textColor);
    const swatchSize = Math.max(16, roundLayout(layout.shortEdge * .024));
    drawPalette(context, layout, layout.infoStartY + Math.floor((layout.bottomBorder - swatchSize) / 2), outlineColor);
  }

  let context2d = previewCanvas.getContext("2d", { alpha: false });

  function render() {
    if (!state.photo) return;
    const layout = createLayout(state.templateId);
    setCanvasSize(layout);
    context2d = previewCanvas.getContext("2d", { alpha: false });
    context2d.clearRect(0, 0, previewCanvas.width, previewCanvas.height);

    if (state.templateId === 1 || state.templateId === 2) {
      drawWhiteTemplate(context2d, layout);
    } else {
      drawBlurTemplate(context2d, layout);
    }
  }

  function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map((value) => value.toString(16).padStart(2, "0")).join("").toUpperCase();
  }

  function colorData(rgb, pixels, total) {
    const linear = (value) => {
      const normalized = value / 255;
      return normalized <= .04045 ? normalized / 12.92 : Math.pow((normalized + .055) / 1.055, 2.4);
    };
    const red = linear(rgb[0]); const green = linear(rgb[1]); const blue = linear(rgb[2]);
    const l = .4122214708 * red + .5363325363 * green + .0514459929 * blue;
    const m = .2119034982 * red + .6806995451 * green + .1073969566 * blue;
    const s = .0883024619 * red + .2817188376 * green + .6299787005 * blue;
    const lr = Math.cbrt(l); const mr = Math.cbrt(m); const sr = Math.cbrt(s);
    const lab = [.2104542553 * lr + .793617785 * mr - .0040720468 * sr, 1.9779984951 * lr - 2.428592205 * mr + .4505937099 * sr, .0259040371 * lr + .782771766 * mr - .808675766 * sr];
    const maximum = Math.max(...rgb); const minimum = Math.min(...rgb); const delta = maximum - minimum;
    let hue = 0;
    if (delta) hue = ((maximum === rgb[0] ? (rgb[1] - rgb[2]) / delta : maximum === rgb[1] ? 2 + (rgb[2] - rgb[0]) / delta : 4 + (rgb[0] - rgb[1]) / delta) / 6 + 1) % 1;
    return { rgb, pixels, share: pixels / total, lab, lightness: lab[0], saturation: maximum ? delta / maximum : 0, hue };
  }

  function colorDistance(left, right) {
    return Math.hypot(left.lab[0] - right.lab[0], left.lab[1] - right.lab[1], left.lab[2] - right.lab[2]);
  }

  function hueDistance(left, right) {
    const distance = Math.abs(left - right);
    return Math.min(distance, 1 - distance);
  }

  function medianCut(pixels, limit) {
    const points = [];
    for (let index = 0; index < pixels.length; index += 4) if (pixels[index + 3] > 0) points.push([pixels[index], pixels[index + 1], pixels[index + 2]]);
    let boxes = points.length ? [points] : [];
    while (boxes.length < limit) {
      let selected = -1; let selectedRange = -1; let channel = 0;
      boxes.forEach((box, index) => {
        if (box.length < 2) return;
        const minimum = [255, 255, 255];
        const maximum = [0, 0, 0];
        box.forEach((point) => {
          for (let axis = 0; axis < 3; axis += 1) {
            if (point[axis] < minimum[axis]) minimum[axis] = point[axis];
            if (point[axis] > maximum[axis]) maximum[axis] = point[axis];
          }
        });
        const ranges = maximum.map((value, axis) => value - minimum[axis]);
        const range = Math.max(...ranges) * box.length;
        if (range > selectedRange) { selected = index; selectedRange = range; channel = ranges.indexOf(Math.max(...ranges)); }
      });
      if (selected < 0) break;
      const box = boxes.splice(selected, 1)[0].sort((left, right) => left[channel] - right[channel]);
      boxes.push(box.slice(0, Math.floor(box.length / 2)), box.slice(Math.floor(box.length / 2)));
    }
    return boxes.filter((box) => box.length).map((box) => ({ pixels: box.length, rgb: [0, 1, 2].map((channel) => roundLayout(box.reduce((sum, point) => sum + point[channel], 0) / box.length)) }));
  }

  function extractPalette(image) {
    const sample = document.createElement("canvas");
    const scale = Math.min(1, 420 / Math.max(image.naturalWidth || image.width, image.naturalHeight || image.height));
    sample.width = Math.max(1, roundLayout((image.naturalWidth || image.width) * scale));
    sample.height = Math.max(1, roundLayout((image.naturalHeight || image.height) * scale));
    const context = sample.getContext("2d", { willReadFrequently: true });
    context.drawImage(image, 0, 0, sample.width, sample.height);
    const pixels = context.getImageData(0, 0, sample.width, sample.height).data;
    const quantized = medianCut(pixels, 64);
    if (!quantized.length) return Array(5).fill("#808080");
    const merged = [];
    quantized.sort((left, right) => right.pixels - left.pixels).forEach((item) => {
      const candidate = colorData(item.rgb, item.pixels, 1);
      const match = merged.find((existing) => colorDistance(candidate, colorData(existing.rgb, existing.pixels, 1)) < .035);
      if (!match) merged.push({ rgb: item.rgb.slice(), pixels: item.pixels });
      else { const count = match.pixels + item.pixels; match.rgb = match.rgb.map((value, index) => roundLayout((value * match.pixels + item.rgb[index] * item.pixels) / count)); match.pixels = count; }
    });
    const total = merged.reduce((sum, item) => sum + item.pixels, 0);
    const candidates = merged.map((item) => colorData(item.rgb, item.pixels, total));
    const average = colorData([0, 1, 2].map((channel) => roundLayout(candidates.reduce((sum, item) => sum + item.rgb[channel] * item.pixels, 0) / total)), total, total);
    candidates.forEach((item) => { item.visualScore = .42 * Math.min(Math.sqrt(item.share / .12), 1) + .35 * item.saturation * (.4 + .6 * item.lightness) + .23 * Math.min(colorDistance(item, average) / .22, 1); });
    const selected = [];
    const light = candidates.filter((item) => item.lightness >= .84 && item.saturation <= .18);
    if (light.reduce((sum, item) => sum + item.share, 0) >= .04) selected.push(light.sort((left, right) => right.pixels * (.55 + .45 * right.lightness) - left.pixels * (.55 + .45 * left.lightness))[0]);
    const families = [];
    candidates.filter((item) => item.lightness >= .3 && item.saturation >= .2).forEach((item) => { let family = families.find((group) => hueDistance(group[0].hue, item.hue) <= .055); if (!family) { family = []; families.push(family); } family.push(item); });
    const representatives = families.filter((family) => family.reduce((sum, item) => sum + item.share, 0) >= .01).map((family) => { const brightest = Math.max(...family.map((item) => item.lightness)); const pool = family.filter((item) => item.lightness >= Math.max(.4, brightest - .15) && item.share >= .002); return (pool.length ? pool : family).sort((left, right) => Math.sqrt(right.share) * (.4 + .6 * right.saturation) - Math.sqrt(left.share) * (.4 + .6 * left.saturation))[0]; });
    const pool = candidates.concat(representatives);
    let preferLargeAreas = true;
    while (selected.length < 5) {
      const eligible = pool.filter((item) => !selected.includes(item) && (!preferLargeAreas || item.share >= .015)).filter((item) => selected.every((chosen) => colorDistance(item, chosen) >= .055 && !(item.lightness >= .3 && item.saturation >= .2 && chosen.lightness >= .3 && chosen.saturation >= .2 && hueDistance(item.hue, chosen.hue) <= .055)));
      if (!eligible.length && preferLargeAreas) { preferLargeAreas = false; continue; }
      const choice = eligible.sort((left, right) => {
        const score = (item) => { const nearest = selected.length ? Math.min(...selected.map((chosen) => colorDistance(item, chosen))) : .18; const duplicateDark = item.lightness <= .28 && selected.some((chosen) => chosen.lightness <= .28); const duplicateGray = item.lightness > .28 && item.lightness < .84 && item.saturation < .12 && selected.some((chosen) => chosen.lightness > .28 && chosen.lightness < .84 && chosen.saturation < .12); return duplicateDark || duplicateGray ? -1 : item.visualScore + .25 * Math.min(nearest / .18, 1); }; return score(right) - score(left); })[0];
      if (!choice) break;
      selected.push(choice);
    }
    while (selected.length < 5) selected.push(selected[selected.length - 1] || candidates[0]);
    return selected.sort((left, right) => (left.saturation < .11) - (right.saturation < .11) || right.hue - left.hue).map((item) => rgbToHex(...item.rgb));
  }

  function readExif(arrayBuffer) {
    const result = {};
    try {
      const view = new DataView(arrayBuffer);
      if (view.byteLength < 4 || view.getUint16(0, false) !== 0xffd8) return result;
      let offset = 2;

      while (offset + 4 < view.byteLength) {
        const marker = view.getUint16(offset, false);
        offset += 2;
        if (marker === 0xffda || marker === 0xffd9) break;
        const length = view.getUint16(offset, false);
        if (marker !== 0xffe1 || offset + length > view.byteLength) {
          offset += length;
          continue;
        }

        const exifStart = offset + 2;
        if (view.getUint32(exifStart, false) !== 0x45786966) return result;
        const tiff = exifStart + 6;
        const little = view.getUint16(tiff, false) === 0x4949;
        const get16 = (position) => view.getUint16(position, little);
        const get32 = (position) => view.getUint32(position, little);
        if (get16(tiff + 2) !== 42) return result;

        const typeSize = { 1: 1, 3: 2, 4: 4, 5: 8 };
        const valueAt = (entryOffset, type, count) => {
          const size = (typeSize[type] || 1) * count;
          const valueOffset = size <= 4 ? entryOffset + 8 : tiff + get32(entryOffset + 8);
          if (valueOffset + size > view.byteLength) return null;
          if (type === 3) return get16(valueOffset);
          if (type === 4) return get32(valueOffset);
          if (type === 5) {
            const denominator = get32(valueOffset + 4);
            return denominator ? get32(valueOffset) / denominator : null;
          }
          return null;
        };

        const readIfd = (ifdOffset) => {
          const entries = get16(ifdOffset);
          const found = {};
          for (let index = 0; index < entries; index += 1) {
            const entry = ifdOffset + 2 + index * 12;
            if (entry + 12 > view.byteLength) break;
            const tag = get16(entry);
            const type = get16(entry + 2);
            const count = get32(entry + 4);
            found[tag] = valueAt(entry, type, count);
          }
          return found;
        };

        const ifd0 = tiff + get32(tiff + 4);
        const ifd0Values = readIfd(ifd0);
        const exifPointer = ifd0Values[0x8769];
        if (exifPointer) {
          const exifValues = readIfd(tiff + exifPointer);
          result.fNumber = exifValues[0x829d];
          result.exposureTime = exifValues[0x829a];
          result.focalLength = exifValues[0x920a];
          result.iso = exifValues[0x8827] || exifValues[0x8833];
        }
        return result;
      }
    } catch (error) {
      return result;
    }
    return result;
  }

  function imageFromFile(file) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      const url = URL.createObjectURL(file);
      image.onload = () => resolve({ image, url });
      image.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("图片无法读取"));
      };
      image.src = url;
    });
  }

  async function photoFromFile(file) {
    if ("createImageBitmap" in window) {
      try {
        const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
        return { image: bitmap, url: null };
      } catch (error) {
        // Fall through to the Image element path for browsers that reject this option.
      }
    }
    return imageFromFile(file);
  }

  function fileExtension(file) {
    return (file.name.split(".").pop() || "").toLowerCase();
  }

  function isHeicFile(file) {
    const type = (file.type || "").toLowerCase();
    return ["heic", "heif"].includes(fileExtension(file)) || ["image/heic", "image/heif", "image/heic-sequence", "image/heif-sequence"].includes(type);
  }

  async function convertHeicToJpeg(file) {
    if (typeof window.heic2any !== "function") {
      throw new Error("HEIC 转换组件未加载");
    }
    const converted = await window.heic2any({ blob: file, toType: "image/jpeg", quality: 0.92 });
    const jpeg = Array.isArray(converted) ? converted[0] : converted;
    if (!(jpeg instanceof Blob)) {
      throw new Error("HEIC 转换未返回图片");
    }
    const name = file.name.replace(/\.(heic|heif)$/i, ".jpg") || "photo.jpg";
    return new File([jpeg], name, { type: "image/jpeg", lastModified: file.lastModified });
  }

  async function loadPhoto(file) {
    if (!file) return;
    const originalFile = file;
    const extension = fileExtension(file);
    const heic = isHeicFile(file);
    const supported = ["jpg", "jpeg", "png", "webp"];
    if (!supported.includes(extension) && !heic) {
      setStatus("请选择 JPG、PNG、WebP 或 HEIC 图片", true);
      return;
    }

    try {
      if (heic) {
        setStatus("正在本机转换 HEIC 照片…");
        file = await convertHeicToJpeg(file);
      } else {
        setStatus("正在读取照片…");
      }
      const loaded = await photoFromFile(file);
      const exif = !heic && file.type === "image/jpeg" ? readExif(await file.arrayBuffer()) : {};
      if (state.photoUrl) URL.revokeObjectURL(state.photoUrl);
      if (state.photo && typeof state.photo.close === "function") state.photo.close();
      state.photo = loaded.image;
      state.photoUrl = loaded.url;
      state.photoName = originalFile.name;
      state.exif = exif;
      if (!hasExifInfo(exif)) {
        state.showExif = false;
        exifToggle.checked = false;
      }
      try {
        state.palette = extractPalette(loaded.image);
      } catch (error) {
        state.palette = ["#182A2D", "#56483D", "#B29C83", "#7D5C47", "#F3F0E9"];
      }
      previewStage.classList.add("ready");
      downloadButton.disabled = false;
      changePhotoButton.disabled = false;
      changeLogoButton.disabled = false;
      render();
      setStatus("已添加 1 张照片 · " + originalFile.name);
    } catch (error) {
      setStatus(heic ? "HEIC 照片转换失败，请尝试另一张照片" : "照片读取失败，请尝试另一张图片", true);
    }
  }

  async function loadLogo(file) {
    if (!file) return;
    try {
      setStatus("正在读取 Logo…");
      const loaded = await imageFromFile(file);
      if (state.logoUrl) URL.revokeObjectURL(state.logoUrl);
      state.logo = loaded.image;
      state.logoUrl = loaded.url;
      render();
      setStatus("已更换 Logo 图片 · 将按比例等高显示");
    } catch (error) {
      setStatus("Logo 图片读取失败", true);
    }
  }

  function exportImage() {
    if (!state.photo) return;
    render();
    downloadButton.disabled = true;
    setStatus("正在生成边框照片…");
    const finishExport = (blob) => {
      downloadButton.disabled = false;
      if (!blob) {
        setStatus("生成失败，请使用 Chrome 或 Edge 重新打开页面后重试", true);
        return;
      }
      const link = document.createElement("a");
      const originalName = state.photoName.replace(/\.[^.]+$/, "");
      link.href = URL.createObjectURL(blob);
      link.download = originalName + "_sample" + state.templateId + ".jpg";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
      setStatus("已生成边框照片");
    };

    try {
      previewCanvas.toBlob(finishExport, "image/jpeg", .94);
    } catch (error) {
      downloadButton.disabled = false;
      setStatus("生成失败：浏览器无法导出此画布，请使用 Chrome 或 Edge 重新打开页面后重试", true);
    }
  }

  function selectTemplate(button) {
    state.templateId = Number(button.dataset.template);
    templateGrid.querySelectorAll(".template-card").forEach((item) => item.classList.toggle("selected", item === button));
    if (state.photo) render();
  }

  function bindDropTarget(target) {
    ["dragenter", "dragover"].forEach((eventName) => {
      target.addEventListener(eventName, (event) => {
        event.preventDefault();
        if (target === uploadButton) target.classList.add("dragging");
      });
    });
    ["dragleave", "drop"].forEach((eventName) => {
      target.addEventListener(eventName, (event) => {
        event.preventDefault();
        if (target === uploadButton) target.classList.remove("dragging");
      });
    });
    target.addEventListener("drop", (event) => loadPhoto(event.dataTransfer.files[0]));
  }

  uploadButton.addEventListener("click", () => photoInput.click());
  mobileUploadButton.addEventListener("click", () => photoInput.click());
  changePhotoButton.addEventListener("click", () => photoInput.click());
  changeLogoButton.addEventListener("click", () => logoInput.click());
  photoInput.addEventListener("change", () => loadPhoto(photoInput.files[0]));
  logoInput.addEventListener("change", () => loadLogo(logoInput.files[0]));
  downloadButton.addEventListener("click", exportImage);
  templateGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".template-card");
    if (button) selectTemplate(button);
  });

  [logoToggle, exifToggle, paletteToggle].forEach((toggle) => {
    toggle.addEventListener("change", () => {
      state.showLogo = logoToggle.checked;
      state.showExif = exifToggle.checked;
      state.showPalette = paletteToggle.checked;
      if (state.photo) render();
    });
  });

  bindDropTarget(uploadButton);
  bindDropTarget(previewStage);
})();
