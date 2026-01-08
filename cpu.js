// ===== CPU & ELECTRONICS MOD =====
enabledMods ||= [];
enabledMods.push("cpu_mod");

elements.power = {
    color: "#ffff00",
    behavior: behaviors.WALL,
    category: "electronics",
    state: "energy"
};

elements.wire = {
    color: "#555555",
    category: "electronics",
    behavior: [
        "XX|SH|XX",
        "SH|XX|SH",
        "XX|SH|XX"
    ],
    conduct: 1
};

elements.cpu = {
    color: "#00ffcc",
    category: "electronics",
    state: "solid",
    tick: function(pixel) {
        if (pixel.charge > 0) {
            pixel.on = true;
            pixel.charge--;
        } else {
            pixel.on = false;
        }
    },
    properties: {
        on: false
    }
};

elements.ram = {
    color: "#0066ff",
    category: "electronics",
    state: "solid",
    tick: function(pixel) {
        if (pixel.charge > 0) {
            pixel.bit = 1;
        } else {
            pixel.bit = 0;
        }
    },
    properties: {
        bit: 0
    }
};

elements.gpu = {
    color: "#ff00ff",
    category: "electronics",
    state: "solid",
    tick: function(pixel) {
        if (pixel.charge > 0) {
            pixel.color = "#ffffff"; // pixel ON
        } else {
            pixel.color = "#ff00ff"; // pixel OFF
        }
    }
};

// ===== POWER PROPAGATION =====
elements.wire.tick = function(pixel) {
    for (let i = 0; i < adjacentCoords.length; i++) {
        let x = pixel.x + adjacentCoords[i][0];
        let y = pixel.y + adjacentCoords[i][1];
        if (!isEmpty(x, y, true)) {
            let other = pixelMap[x][y];
            if (other.element !== "wire" && other.charge < 5) {
                other.charge = 5;
            }
        }
    }
};
