import React from "react";
import "./styles.css";

export default function ViewToggle({ value, onChange }) {
    return (
        <div className="vt-wrap">
            <button
                className={`vt-btn ${value === "split" ? "is-active" : ""}`}
                onClick={() => onChange("split")}
                title="Lista + Mapa"
            >
                ⧉
            </button>

            <button
                className={`vt-btn ${value === "map" ? "is-active" : ""}`}
                onClick={() => onChange("map")}
                title="Solo mapa"
            >
                ⊙
            </button>

            <button
                className={`vt-btn ${value === "list" ? "is-active" : ""}`}
                onClick={() => onChange("list")}
                title="Solo lista"
            >
                ☰
            </button>
        </div>
    );
}
