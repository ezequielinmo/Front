import React from "react";
import "./styles.css";

export default function Pagination({ page, totalPages, onChange }) {
    const prev = () => onChange(Math.max(1, page - 1));
    const next = () => onChange(Math.min(totalPages, page + 1));

    return (
        <div className="pg-wrap">
            <button className="pg-btn" onClick={prev} disabled={page <= 1}>‹</button>
            <div className="pg-info">{page} / {totalPages}</div>
            <button className="pg-btn" onClick={next} disabled={page >= totalPages}>›</button>
        </div>
    );
}
