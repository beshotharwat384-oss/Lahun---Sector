import React from "react";
import classNames from "classnames";
import "./../App.css";

export default function SectionButtons({ sections, activeSection, onJump }) {
  return (
    <div className="section-buttons">
      {sections.map(sec => {
        const active = activeSection.id === sec.id;
        return (
          <button
            key={sec.id}
            className={classNames("section-btn", { active })}
            onClick={() => onJump(sec)}
          >
            {sec.title}
          </button>
        );
      })}
    </div>
  );
}
