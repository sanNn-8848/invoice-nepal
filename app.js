(function () {
  "use strict";

  var STORE_KEY = "invoicenepal.doc.v1";
  var SAVED_KEY = "invoicenepal.saved.v1";
  var LOGO_KEY = "invoicenepal.logo.v1";
  var THEME_KEY = "invoicenepal.theme.v1";
  var SIZE_KEY = "invoicenepal.size.v1";

  var DOCTYPES = { invoice: "Invoice", quotation: "Quotation", receipt: "Receipt" };

  var CURRENCIES = { NPR: "Rs", USD: "$", INR: "₹", EUR: "€", GBP: "£" };

  var BS_MONTHS = [
    "Baishakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashwin",
    "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"
  ];

  var BS_DATA = [
    [1970, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [1971, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
    [1972, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [1973, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    [1974, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [1975, 31, 31, 32, 32, 30, 31, 30, 29, 30, 29, 30, 30],
    [1976, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [1977, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    [1978, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [1979, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [1980, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [1981, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    [1982, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [1983, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [1984, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [1985, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    [1986, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [1987, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [1988, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [1989, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    [1990, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [1991, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [1992, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    [1993, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    [1994, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [1995, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    [1996, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    [1997, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [1998, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [1999, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2000, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    [2001, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2002, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [2003, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2004, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    [2005, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2006, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [2007, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2008, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
    [2009, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2010, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [2011, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2012, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    [2013, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2014, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [2015, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2016, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    [2017, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2018, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [2019, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    [2020, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    [2021, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2022, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    [2023, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    [2024, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    [2025, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2026, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2027, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    [2028, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2029, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
    [2030, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2031, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    [2032, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2033, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [2034, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2035, 30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
    [2036, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2037, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [2038, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2039, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    [2040, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2041, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [2042, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2043, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    [2044, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2045, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [2046, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2047, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    [2048, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2049, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    [2050, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    [2051, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    [2052, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2053, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    [2054, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    [2055, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2056, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
    [2057, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2058, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    [2059, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2060, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [2061, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2062, 30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
    [2063, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2064, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [2065, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2066, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
    [2067, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2068, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [2069, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2070, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    [2071, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2072, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [2073, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2074, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    [2075, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2076, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    [2077, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    [2078, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    [2079, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2080, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    [2081, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    [2082, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2083, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2084, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
    [2085, 31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30],
    [2086, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
    [2087, 31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
    [2088, 30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30],
    [2089, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
    [2090, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30]
  ];

  var BS_EPOCH_MS = Date.UTC(1913, 3, 13);

  var ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
    "Eighteen", "Nineteen"];

  var TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  var $ = function (id) { return document.getElementById(id); };

  function isEditable(el) {
    if (!el || !el.tagName) return false;
    var tag = el.tagName;
    return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable === true;
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function num(v) {
    var n = parseFloat(v);
    return isFinite(n) ? n : 0;
  }

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function todayISO() {
    var d = new Date();
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  function defaultState() {
    return {
      doctype: "invoice",
      biz: { name: "", address: "", phone: "", email: "", pan: "" },
      client: { name: "", address: "", phone: "", pan: "" },
      doc: {
        number: "",
        date: todayISO(),
        due: "",
        currency: "NPR",
        vatRate: 13,
        discount: 0,
        payMethod: "",
        notes: ""
      },
      items: [{ desc: "", qty: 1, rate: 0 }],
      options: { bs: false, words: true, signature: true, stamp: false }
    };
  }

  var state = defaultState();

  /* The logo is a business-level setting, not part of any one document, so it
     lives in its own localStorage slot. Keeping it out of the document means
     every saved invoice stays small and New/Open never has to carry it. */
  var logoData = "";
  var logoName = "";

  function loadLogo() {
    try {
      var v = JSON.parse(localStorage.getItem(LOGO_KEY));
      if (v && typeof v === "object" && typeof v.data === "string") {
        logoData = v.data;
        logoName = typeof v.name === "string" ? v.name : "";
      }
    } catch (e) { logoData = ""; logoName = ""; }
  }

  function persistLogo() {
    try {
      localStorage.setItem(LOGO_KEY, JSON.stringify({ data: logoData, name: logoName }));
      return true;
    } catch (e) {
      if (isQuotaError(e)) logoError("Storage is full — try a smaller logo");
      else logoError("This browser would not save the logo");
      return false;
    }
  }

  function load() {
    loadLogo();
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) { saved = null; }
    if (saved && typeof saved === "object") {
      state = merge(defaultState(), saved);
    }
    if (!logoData && saved && saved.biz && typeof saved.biz.logo === "string" && saved.biz.logo) {
      logoData = saved.biz.logo;
      logoName = typeof saved.biz.logoName === "string" ? saved.biz.logoName : "";
      persistLogo();
    }
    if (!state.doc.number) {
      state.doc.number = nextNumber();
    }
  }

  function merge(base, over) {
    var out = {};
    Object.keys(base).forEach(function (k) {
      var b = base[k], o = over[k];
      if (b && typeof b === "object" && !Array.isArray(b) && o && typeof o === "object") {
        out[k] = merge(b, o);
      } else if (o !== undefined && o !== null && o !== "") {
        out[k] = o;
      } else {
        out[k] = b;
      }
    });
    return out;
  }

  function nextNumber() {
    var list = readSaved();
    var max = 0;
    list.forEach(function (d) {
      var m = String(d.doc && d.doc.number || "").match(/(\d+)\s*$/);
      if (m) { var n = parseInt(m[1], 10); if (n > max) max = n; }
    });
    return "INV-" + String(max + 1).padStart(4, "0");
  }

  var saveTimer = null;

  function persist() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      try {
        localStorage.setItem(STORE_KEY, JSON.stringify(state));
      } catch (e) {
        toast(isQuotaError(e)
          ? "Storage is full — delete a saved document to free space"
          : "Could not save your details");
      }
    }, 350);
  }

  function isQuotaError(e) {
    return e && (e.name === "QuotaExceededError" ||
      e.name === "NS_ERROR_DOM_QUOTA_REACHED" ||
      e.code === 22 || e.code === 1014);
  }

  function readSaved() {
    try {
      var v = JSON.parse(localStorage.getItem(SAVED_KEY));
      return Array.isArray(v) ? v : [];
    } catch (e) { return []; }
  }

  function writeSaved(list) {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(list));
      return true;
    } catch (e) {
      if (isQuotaError(e)) toast("Storage is full — delete a saved document to free space");
      return false;
    }
  }

  /* ---------- Logo handling ----------
     Images are downscaled to at most 420px on the longest edge and re-encoded
     as PNG (transparency preserved) so a phone photo does not blow past the
     ~5MB localStorage budget. SVG is kept as text. */

  var LOGO_TYPES = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/svg+xml": "svg"
  };

  var LOGO_MAX_BYTES = 4 * 1024 * 1024;
  var LOGO_MAX_EDGE = 420;

  function readFile(file) {
    return new Promise(function (resolve, reject) {
      var r = new FileReader();
      r.onload = function () { resolve(r.result); };
      r.onerror = function () { reject(new Error("Could not read that file")); };
      r.readAsDataURL(file);
    });
  }

  function loadImage(src) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function () { resolve(img); };
      img.onerror = function () { reject(new Error("That file is not a readable image")); };
      img.src = src;
    });
  }

  function downscale(dataUrl, mime) {
    return loadImage(dataUrl).then(function (img) {
      var w = img.naturalWidth || img.width;
      var h = img.naturalHeight || img.height;
      if (!w || !h) throw new Error("That image has no readable dimensions");

      var scale = Math.min(1, LOGO_MAX_EDGE / Math.max(w, h));
      var tw = Math.max(1, Math.round(w * scale));
      var th = Math.max(1, Math.round(h * scale));

      var canvas = document.createElement("canvas");
      canvas.width = tw;
      canvas.height = th;
      var ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, tw, th);

      var hasAlpha = ctx.getImageData(0, 0, tw, th).data.some(function (v, i) {
        return i % 4 === 3 && v < 255;
      });

      if (hasAlpha) {
        return { data: canvas.toDataURL("image/png"), w: tw, h: th, mime: "image/png" };
      }

      var jpg = canvas.toDataURL("image/jpeg", 0.9);
      var png = canvas.toDataURL("image/png");
      return {
        data: jpg.length < png.length ? jpg : png,
        w: tw, h: th,
        mime: jpg.length < png.length ? "image/jpeg" : "image/png"
      };
    });
  }

  function sanitizeSVG(text) {
    return String(text)
      .replace(/<\\\//g, "</")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, "")
      .replace(/<!DOCTYPE[^>[]*(\[[\s\S]*?\])?[^>]*>/gi, "")
      .replace(/<script[\s\S]*?<\/script\s*>/gi, "")
      .replace(/<script[^>]*>/gi, "")
      .replace(/<\/script\s*>/gi, "")
      .replace(/<foreignObject[\s\S]*?<\/foreignObject\s*>/gi, "")
      .replace(/<iframe[\s\S]*?<\/iframe\s*>/gi, "")
      .replace(/<embed[^>]*>/gi, "")
      .replace(/<object[\s\S]*?<\/object\s*>/gi, "")
      .replace(/<handler[\s\S]*?<\/handler\s*>/gi, "")
      .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
      .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
      .replace(/\son\w+\s*=\s*[^\s>]+/gi, "")
      .replace(/(?:xlink:)?href\s*=\s*"\s*javascript:[^"]*"/gi, "")
      .replace(/(?:xlink:)?href\s*=\s*'\s*javascript:[^']*'/gi, "")
      .replace(/(?:xlink:)?href\s*=\s*javascript:[^\s>]*/gi, "")
      .replace(/(?:xlink:)?href\s*=\s*(["'])\s*(?!#)[^"']*\1/gi, "");
  }

  function processLogo(file) {
    if (!file) return Promise.reject(new Error("No file chosen"));
    if (!LOGO_TYPES[file.type]) {
      return Promise.reject(new Error("Use a PNG, JPG, WEBP, GIF or SVG file"));
    }
    if (file.size > LOGO_MAX_BYTES) {
      return Promise.reject(new Error("That file is over 4 MB — please pick a smaller one"));
    }

    return readFile(file).then(function (dataUrl) {
      if (file.type === "image/svg+xml") {
        return fetch(dataUrl).then(function (r) { return r.text(); }).then(function (text) {
          var clean = sanitizeSVG(text);
          if (!/<svg[\s>]/i.test(clean)) throw new Error("That file does not look like an SVG");
          return { data: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(clean), w: 0, h: 0, mime: "image/svg+xml" };
        });
      }
      return downscale(dataUrl, file.type);
    });
  }

  function applyLogo(processed, name) {
    logoData = processed.data;
    logoName = name || "";
    if (!persistLogo()) return;
    render();
    renderLogoUI();
    var kb = Math.round(logoData.length * 0.75 / 1024);
    toast("Logo added" + (processed.mime === "image/svg+xml" ? " (SVG)" : " (" + kb + " KB)"));
  }

  function clearLogo(message) {
    logoData = "";
    logoName = "";
    try { localStorage.removeItem(LOGO_KEY); } catch (e) { /* nothing to do */ }
    render();
    renderLogoUI();
    if (message) toast(message);
  }

  function renderLogoUI() {
    var drop = $("logoDrop");
    var thumb = $("logoThumb");
    var hint = $("logoHint");
    var remove = $("logoRemove");
    var note = $("logoNote");

    if (logoData) {
      thumb.src = logoData;
      thumb.hidden = false;
      hint.hidden = true;
      drop.classList.add("has-logo");
      thumb.setAttribute("alt", logoName ? "Logo: " + logoName : "Your business logo");
    } else {
      thumb.hidden = true;
      thumb.removeAttribute("src");
      hint.hidden = false;
      drop.classList.remove("has-logo");
    }

    remove.hidden = !logoData;

    if (logoData && logoName) {
      var kb = Math.round(logoData.length * 0.75 / 1024);
      note.hidden = false;
      note.className = "logo-note muted";
      note.textContent = logoName.length > 22
        ? logoName.slice(0, 20) + "… · " + kb + " KB"
        : logoName + " · " + kb + " KB";
    } else {
      note.hidden = true;
    }
  }

  function logoError(msg) {
    var note = $("logoNote");
    note.hidden = false;
    note.className = "logo-note is-warn";
    note.textContent = msg;
    toast(msg);
  }

  function toBS(iso) {
    var parts = String(iso || "").split("-");
    if (parts.length !== 3) return null;
    var y = parseInt(parts[0], 10), m = parseInt(parts[1], 10), d = parseInt(parts[2], 10);
    if (!y || !m || !d) return null;

    var ms = Date.UTC(y, m - 1, d);
    if (ms < BS_EPOCH_MS) return null;

    var dayIndex = Math.floor((ms - BS_EPOCH_MS) / 86400000);
    var row = BS_DATA[0];
    var year = row[0], mi = 0, di = 0;

    for (var i = 0; i < BS_DATA.length; i++) {
      var r = BS_DATA[i];
      var total = 0;
      for (var j = 1; j <= 12; j++) total += r[j];
      if (dayIndex < total) { row = r; year = r[0]; break; }
      dayIndex -= total;
    }

    for (var k = 1; k <= 12; k++) {
      if (dayIndex < row[k]) { mi = k - 1; di = dayIndex; break; }
      dayIndex -= row[k];
    }

    return { y: year, m: mi, d: di + 1 };
  }

  function bsText(iso) {
    var b = toBS(iso);
    if (!b) return "";
    return b.y + "/" + BS_MONTHS[b.m] + "/" + b.d;
  }

  function twoDigits(n) {
    if (n < 20) return ONES[n];
    return TENS[Math.floor(n / 10)] + (n % 10 ? " " + ONES[n % 10] : "");
  }

  function threeDigits(n) {
    var out = [];
    if (n >= 100) {
      out.push(ONES[Math.floor(n / 100)] + " Hundred");
      n %= 100;
      if (n) out.push(twoDigits(n));
    } else if (n > 0) {
      out.push(twoDigits(n));
    }
    return out.join(" ");
  }

  function wordsIndian(numValue) {
    if (numValue === 0) return "Zero";
    var parts = [];
    var n = Math.floor(Math.abs(numValue));
    var crore = Math.floor(n / 10000000); n %= 10000000;
    var lakh = Math.floor(n / 100000); n %= 100000;
    var thousand = Math.floor(n / 1000); n %= 1000;
    var hundred = Math.floor(n / 100);
    var rest = n % 100;

    if (crore) parts.push(wordsIndian(crore) + " Crore");
    if (lakh) parts.push(wordsIndian(lakh) + " Lakh");
    if (thousand) parts.push(wordsIndian(thousand) + " Thousand");
    if (hundred) parts.push(ONES[hundred] + " Hundred");
    if (rest) parts.push(twoDigits(rest));

    return parts.join(" ");
  }

  function wordsFor(value) {
    var whole = Math.floor(Math.abs(value));
    var paisa = Math.round((Math.abs(value) - whole) * 100);
    var out = wordsIndian(whole) + " " + (CURRENCIES[state.doc.currency] || "");
    if (paisa > 0) out += " and " + twoDigits(paisa) + " Paisa";
    if (value < 0) out = "Minus " + out;
    return out;
  }

  function money(n) {
    return (CURRENCIES[state.doc.currency] || "") + " " +
      num(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function totals() {
    var sub = 0;
    var rows = state.items.map(function (it) {
      var q = num(it.qty), r = num(it.rate);
      var amt = q * r;
      sub += amt;
      return { desc: it.desc, qty: q, rate: r, amt: amt };
    });
    var discount = num(state.doc.discount);
    var taxable = sub - discount;
    if (taxable < 0) taxable = 0;
    var rate = num(state.doc.vatRate);
    var vat = (taxable * rate) / 100;
    return { rows: rows, sub: sub, discount: discount, taxable: taxable, vat: vat, total: taxable + vat };
  }

  function line(el) {
    return '<div class="p-kv">' + el + '</div>';
  }

  function render() {
    var t = totals();
    var d = state.doc;
    var b = state.biz;
    var c = state.client;
    var title = DOCTYPES[state.doctype] || "Invoice";
    var cur = CURRENCIES[d.currency] || "";

    var h = "";

    h += '<div class="p-head">';
    h += '<div class="p-biz">';
    h += '<div class="p-biz-top">';
    if (logoData) {
      h += '<img class="p-logo" src="' + esc(logoData) + '" alt="">';
    }
    h += "<h2>" + esc(b.name || "Your Business Name") + "</h2>";
    h += "</div>";
    var bizLines = [];
    if (b.address) bizLines.push(esc(b.address));
    var contact = [b.phone, b.email].filter(Boolean).map(esc).join(" &nbsp;•&nbsp; ");
    if (contact) bizLines.push(contact);
    if (b.pan) bizLines.push("PAN/VAT: " + esc(b.pan));
    h += bizLines.map(function (x) { return "<p>" + x + "</p>"; }).join("");
    h += "</div>";
    h += '<div class="p-meta">';
    h += '<h1 class="p-title">' + title + "</h1>";
    h += line("<b>No.</b> " + esc(d.number || "—"));
    h += line("<b>Date</b> " + esc(d.date || "—"));
    if (d.due) {
      h += line("<b>" + (state.doctype === "receipt" ? "Paid on" : "Due") + "</b> " + esc(d.due));
    }
    if (state.options.bs && d.date) {
      h += line("<b>" + esc(title) + " date (B.S.)</b> " + esc(bsText(d.date)));
    }
    h += "</div></div>";

    h += '<div class="p-parties">';
    h += '<div class="p-party"><h3>Bill to</h3>';
    h += '<div class="name">' + esc(c.name || "Customer") + "</div>";
    if (c.address) h += "<p>" + esc(c.address) + "</p>";
    var ccontact = [c.phone, c.pan ? "PAN: " + c.pan : ""].filter(Boolean).map(esc).join("<br>");
    if (ccontact) h += "<p>" + ccontact + "</p>";
    h += "</div>";
    h += "</div>";

    if (!t.rows.length) {
      h += '<div class="p-empty">No items yet — add one on the left.</div>';
    } else {
      h += '<table class="p-table"><thead><tr>';
      h += "<th>#</th><th>Description</th><th class=\"num\">Qty</th><th class=\"num\">Rate</th><th class=\"num\">Amount</th>";
      h += "</tr></thead><tbody>";
      t.rows.forEach(function (r, i) {
        h += "<tr>";
        h += "<td>" + (i + 1) + "</td>";
        h += "<td>" + (esc(r.desc) || "&nbsp;") + "</td>";
        h += '<td class="num">' + r.qty + "</td>";
        h += '<td class="num">' + money(r.rate) + "</td>";
        h += '<td class="num">' + money(r.amt) + "</td>";
        h += "</tr>";
      });
      h += "</tbody></table>";
    }

    h += '<div class="p-foot"><div class="p-left">';
    if (state.options.words) {
      h += '<div class="p-words"><span class="lbl">Amount in words</span>' + esc(wordsFor(t.total)) + "</div>";
    }
    if (d.notes) h += '<div class="p-notes">' + esc(d.notes) + "</div>";
    h += "</div>";

    h += '<div class="p-totals"><table>';
    h += "<tr><td>Subtotal</td><td>" + money(t.sub) + "</td></tr>";
    if (t.discount > 0) h += "<tr><td>Discount</td><td>− " + money(t.discount) + "</td></tr>";
    if (num(d.vatRate) > 0) {
      h += "<tr><td>VAT (" + num(d.vatRate) + "%)</td><td>" + money(t.vat) + "</td></tr>";
    }
    h += '<tr class="grand"><td>Total</td><td>' + money(t.total) + "</td></tr>";
    h += "</table>";
    if (d.payMethod) h += '<div class="p-pay">Paid by: ' + esc(d.payMethod) + "</div>";
    h += "</div></div>";

    if (state.options.signature || state.options.stamp) {
      h += '<div class="p-signs">';
      if (state.options.stamp) h += '<div class="p-stamp">Authorised<br>stamp</div>';
      if (state.options.signature) {
        h += '<div class="p-sign"><div class="line"></div><span>Customer signature</span></div>';
        h += '<div class="p-sign"><div class="line"></div><span>For ' + esc(b.name || "the seller") + "</span></div>";
      }
      h += "</div>";
    }

    h += '<div class="p-foot-note">Generated with Invoice Nepal</div>';

    $("paper").innerHTML = h;
    $("itemCount").textContent = t.rows.length + (t.rows.length === 1 ? " item" : " items");
  }

  function renderItems() {
    var wrap = $("itemList");
    wrap.innerHTML = state.items.map(function (it, i) {
      return '<div class="item-row" data-i="' + i + '">' +
        '<input type="text" class="f-desc" data-f="desc" placeholder="Item or service" value="' + esc(it.desc) + '" aria-label="Description">' +
        '<input type="number" class="f-qty" data-f="qty" min="0" step="any" value="' + (it.qty === "" ? "" : num(it.qty)) + '" aria-label="Quantity">' +
        '<input type="number" class="f-rate" data-f="rate" min="0" step="any" value="' + (it.rate === "" ? "" : num(it.rate)) + '" aria-label="Rate">' +
        '<div class="item-amount" data-amount="' + i + '"></div>' +
        '<button type="button" class="item-del" data-del="' + i + '" aria-label="Remove item" title="Remove item">&times;</button>' +
        "</div>";
    }).join("");
    updateAmounts();
  }

  function updateAmounts() {
    var t = totals();
    t.rows.forEach(function (r, i) {
      var el = document.querySelector('[data-amount="' + i + '"]');
      if (el) el.textContent = money(r.amt);
    });
    $("itemCount").textContent = t.rows.length + (t.rows.length === 1 ? " item" : " items");
  }

  var FIELDS = {
    bizName: "biz.name", bizAddress: "biz.address", bizPhone: "biz.phone",
    bizEmail: "biz.email", bizPan: "biz.pan",
    clientName: "client.name", clientAddress: "client.address",
    clientPhone: "client.phone", clientPan: "client.pan",
    docNumber: "doc.number", docDate: "doc.date", docDue: "doc.due",
    currency: "doc.currency", vatRate: "doc.vatRate", discount: "doc.discount",
    payMethod: "doc.payMethod", notes: "doc.notes"
  };

  var CHECKS = { optBs: "bs", optWords: "words", optSignature: "signature", optStamp: "stamp" };

  function setPath(obj, path, val) {
    var parts = path.split(".");
    var t = obj;
    for (var i = 0; i < parts.length - 1; i++) t = t[parts[i]];
    t[parts[parts.length - 1]] = val;
  }

  function getPath(obj, path) {
    return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, obj);
  }

  function fillForm() {
    Object.keys(FIELDS).forEach(function (id) {
      var el = $(id);
      if (el) el.value = getPath(state, FIELDS[id]) ?? "";
    });
    Object.keys(CHECKS).forEach(function (id) {
      var el = $(id);
      if (el) el.checked = !!state.options[CHECKS[id]];
    });
    document.querySelectorAll("[data-doctype]").forEach(function (b) {
      b.classList.toggle("is-active", b.dataset.doctype === state.doctype);
    });
  }

  function toast(msg) {
    var el = $("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(function () { el.classList.remove("show"); }, 2200);
  }

  function renderSaved() {
    var list = readSaved();
    var box = $("savedList");
    if (!list.length) {
      box.innerHTML = '<p class="saved-empty">Nothing saved yet. Hit <strong>Save</strong> to keep a document here.</p>';
      return;
    }
    box.innerHTML = list.map(function (d, i) {
      var t = totalsOf(d);
      var who = (d.client && d.client.name) || "No customer";
      var when = (d.doc && d.doc.date) || "";
      return '<div class="saved-row"><div class="saved-meta">' +
        "<strong>" + esc(who) + " · " + esc((d.doc && d.doc.number) || "") + "</strong>" +
        "<span>" + esc(when) + " · " + esc(moneyOf(t, d)) + "</span>" +
        '</div><div class="saved-actions">' +
        '<button type="button" class="btn btn-sm" data-load="' + i + '">Open</button>' +
        '<button type="button" class="btn btn-sm btn-ghost" data-rm="' + i + '">Delete</button>' +
        "</div></div>";
    }).join("");
  }

  function totalsOf(d) {
    var sub = 0;
    (d.items || []).forEach(function (it) { sub += num(it.qty) * num(it.rate); });
    var disc = num(d.doc && d.doc.discount);
    var taxable = Math.max(0, sub - disc);
    var vat = (taxable * num(d.doc && d.doc.vatRate)) / 100;
    return { sub: sub, discount: disc, total: taxable + vat };
  }

  function moneyOf(t, d) {
    var cur = CURRENCIES[(d.doc && d.doc.currency) || "NPR"] || "";
    return cur + " " + t.total.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function download(name, text) {
    var blob = new Blob([text], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function init() {
    var theme = localStorage.getItem(THEME_KEY) ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.dataset.theme = theme;

    var size = localStorage.getItem(SIZE_KEY) || "a4";
    applySize(size);

    load();
    fillForm();
    renderItems();
    render();
    renderSaved();
    renderLogoUI();

    var logoInput = $("logoInput");
    var logoDrop = $("logoDrop");

    function handleLogoFile(file) {
      if (!file) return;
      processLogo(file)
        .then(function (p) { applyLogo(p, file.name); })
        .catch(function (err) { logoError(err.message || "That image could not be used"); });
    }

    logoDrop.addEventListener("click", function () { logoInput.click(); });
    logoDrop.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        logoInput.click();
      }
    });

    $("logoPick").addEventListener("click", function (e) {
      e.stopPropagation();
      logoInput.click();
    });

    logoInput.addEventListener("change", function () {
      handleLogoFile(logoInput.files && logoInput.files[0]);
      logoInput.value = "";
    });

    $("logoRemove").addEventListener("click", function (e) {
      e.stopPropagation();
      clearLogo("Logo removed");
    });

    ["dragenter", "dragover"].forEach(function (evt) {
      logoDrop.addEventListener(evt, function (e) {
        e.preventDefault();
        e.stopPropagation();
        logoDrop.classList.add("is-over");
      });
    });

    ["dragleave", "dragend"].forEach(function (evt) {
      logoDrop.addEventListener(evt, function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (evt === "dragleave" && logoDrop.contains(e.relatedTarget)) return;
        logoDrop.classList.remove("is-over");
      });
    });

    logoDrop.addEventListener("drop", function (e) {
      e.preventDefault();
      e.stopPropagation();
      logoDrop.classList.remove("is-over");
      var dt = e.dataTransfer;
      if (!dt) return;
      var file = dt.files && dt.files[0];
      if (!file && dt.items) {
        for (var i = 0; i < dt.items.length; i++) {
          if (dt.items[i].kind === "file") { file = dt.items[i].getAsFile(); break; }
        }
      }
      if (file) handleLogoFile(file);
      else logoError("That drop did not contain a file");
    });

    document.addEventListener("paste", function (e) {
      if (!e.clipboardData) return;
      if (isEditable(e.target)) return;
      var items = e.clipboardData.items;
      if (!items) return;
      for (var i = 0; i < items.length; i++) {
        if (items[i].type && items[i].type.indexOf("image/") === 0) {
          var f = items[i].getAsFile();
          if (f) {
            e.preventDefault();
            handleLogoFile(f);
            return;
          }
        }
      }
    });

    Object.keys(FIELDS).forEach(function (id) {
      var el = $(id);
      if (!el) return;
      el.addEventListener("input", function () {
        var path = FIELDS[id];
        var val = el.type === "number" ? (el.value === "" ? "" : num(el.value)) : el.value;
        setPath(state, path, val);
        render();
        persist();
      });
    });

    Object.keys(CHECKS).forEach(function (id) {
      var el = $(id);
      if (!el) return;
      el.addEventListener("change", function () {
        state.options[CHECKS[id]] = el.checked;
        render();
        persist();
      });
    });

    $("itemList").addEventListener("input", function (e) {
      var row = e.target.closest(".item-row");
      if (!row) return;
      var i = +row.dataset.i;
      var f = e.target.dataset.f;
      if (!f) return;
      state.items[i][f] = e.target.type === "number" ? (e.target.value === "" ? "" : num(e.target.value)) : e.target.value;
      updateAmounts();
      render();
      persist();
    });

    $("itemList").addEventListener("click", function (e) {
      var del = e.target.closest("[data-del]");
      if (!del) return;
      state.items.splice(+del.dataset.del, 1);
      if (!state.items.length) state.items.push({ desc: "", qty: 1, rate: 0 });
      renderItems();
      render();
      persist();
    });

    $("btnAddItem").addEventListener("click", function () {
      state.items.push({ desc: "", qty: 1, rate: 0 });
      renderItems();
      render();
      persist();
      var rows = document.querySelectorAll(".item-row");
      var last = rows[rows.length - 1];
      if (last) last.querySelector(".f-desc").focus();
    });

    document.querySelectorAll("[data-doctype]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.doctype = b.dataset.doctype;
        var pre = { invoice: "INV", quotation: "QUO", receipt: "RCP" }[state.doctype];
        var cur = String(state.doc.number || "");
        var m = cur.match(/^([A-Z]+)-(.*)$/);
        if (m) state.doc.number = pre + "-" + m[2];
        fillForm();
        render();
        persist();
      });
    });

    document.querySelectorAll("[data-size]").forEach(function (b) {
      b.addEventListener("click", function () { applySize(b.dataset.size); });
    });

    function applySize(size) {
      $("paper").classList.toggle("is-a5", size === "a5");
      document.querySelectorAll("[data-size]").forEach(function (b) {
        b.classList.toggle("is-active", b.dataset.size === size);
      });
      localStorage.setItem(SIZE_KEY, size);
    }

    $("btnTheme").addEventListener("click", function () {
      var next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem(THEME_KEY, next);
    });

    $("btnNew").addEventListener("click", function () {
      if (!confirm("Start a new blank document? Current unsaved changes will be cleared.")) return;
      state = defaultState();
      state.doc.number = nextNumber();
      fillForm();
      renderItems();
      render();
      renderLogoUI();
      persist();
      toast("New document created");
    });

    $("btnSave").addEventListener("click", function () {
      var list = readSaved();
      var snapshot = JSON.parse(JSON.stringify(state));
      var key = state.doc.number;
      var idx = list.findIndex(function (d) { return d.doc && d.doc.number === key; });
      if (idx >= 0) { list[idx] = snapshot; toast("Updated " + key); }
      else { list.unshift(snapshot); toast("Saved " + key); }
      writeSaved(list);
      renderSaved();
    });

    $("btnPrint").addEventListener("click", function () {
      window.print();
    });

    $("btnJson").addEventListener("click", function () {
      var choice = prompt(
        "Type 1 to download a backup, or 2 to restore from a backup file.",
        "1"
      );
      if (choice === "1") {
        download("invoice-nepal-backup.json", JSON.stringify({
          v: 1,
          doc: state,
          saved: readSaved(),
          logo: { data: logoData, name: logoName }
        }, null, 2));
        toast("Backup downloaded");
      } else if (choice === "2") {
        var input = document.createElement("input");
        input.type = "file";
        input.accept = "application/json,.json";
        input.addEventListener("change", function () {
          var f = input.files && input.files[0];
          if (!f) return;
          var r = new FileReader();
          r.onload = function () {
            try {
              var data = JSON.parse(r.result);
              if (data.logo && typeof data.logo.data === "string") {
                logoData = data.logo.data;
                logoName = typeof data.logo.name === "string" ? data.logo.name : "";
                persistLogo();
              }
              if (data.doc) {
                state = merge(defaultState(), data.doc);
                fillForm();
                renderItems();
                render();
                renderLogoUI();
                persist();
              }
              if (Array.isArray(data.saved)) writeSaved(data.saved);
              renderSaved();
              toast("Backup restored");
            } catch (e) {
              toast("That file could not be read");
            }
          };
          r.readAsText(f);
        });
        input.click();
      }
    });

    $("savedList").addEventListener("click", function (e) {
      var open = e.target.closest("[data-load]");
      if (open) {
        var d = readSaved()[+open.dataset.load];
        if (d) {
          state = merge(defaultState(), d);
          fillForm();
          renderItems();
          render();
          renderLogoUI();
          persist();
          toast("Opened " + (d.doc && d.doc.number || ""));
        }
        return;
      }
      var rm = e.target.closest("[data-rm]");
      if (rm) {
        var list = readSaved();
        list.splice(+rm.dataset.rm, 1);
        writeSaved(list);
        renderSaved();
        toast("Deleted");
      }
    });

    addEventListener("beforeprint", render);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
