"use client";
import React, { useState } from "react";
import { Annotation } from "@/components/ui/Annotation";
import { Reveal } from "@/components/ui/Reveal";
import { Sheet } from "@/components/ui/Sheet";
import { Stamped } from "@/components/ui/Stamped";
import { Switch } from "@/components/ui/Switch";
import { TextLink } from "@/components/ui/TextLink";
import { marks, notes, record } from "@/lib/data";

export function RecordView() {
  const [notesOn, setNotesOn] = useState(true);
  return (
    <main id="main-content" style={{ maxWidth: "var(--container-page)", margin: "0 auto", padding: "var(--space-8) var(--gutter-page) 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: "var(--space-5)" }}>
        <Stamped className="bm-micro" amount={1}>
          The Record
        </Stamped>
        <Switch label="Annotations" checked={notesOn} onChange={(e) => setNotesOn(e.target.checked)} />
      </div>
      <div className="bm-hand-rule" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "var(--gutter-column)", paddingTop: "var(--space-9)" }}>
        <article style={{ gridColumn: "2 / span 6" }}>
          {record.map((block, i) => (
            <Reveal key={i} as="section" eager={i === 0} style={{ marginBottom: i === 3 ? "var(--stack-chapter)" : "var(--space-9)" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-6)", marginBottom: "var(--space-6)" }}>
                <span style={{ font: "var(--weight-regular) var(--size-display-4)/1 var(--font-display)", color: "var(--paper-4)" }}>{marks[i]}</span>
                {i === 0 ? (
                  <Stamped className="bm-micro" amount={1}>
                    Nine accounts, none in agreement
                  </Stamped>
                ) : null}
              </div>
              {block.map((para, j) => (
                <p
                  key={j}
                  style={{
                    font: "var(--type-record)",
                    color: i === 0 && j === 1 ? "var(--text-body)" : "var(--text-secondary)",
                    maxWidth: "var(--measure-record)",
                    margin: "0 0 var(--stack-paragraph)",
                    fontSize: i === 0 && j === 1 ? "var(--size-display-4)" : undefined,
                    lineHeight: i === 0 && j === 1 ? 1.25 : undefined,
                  }}
                >
                  {para}
                </p>
              ))}
              {notesOn && notes[i] ? (
                <div style={{ margin: "var(--space-7) 0 0", marginLeft: "var(--space-8)" }}>
                  <Annotation code={notes[i].ref} tone={notes[i].tone}>
                    {notes[i].text}
                  </Annotation>
                </div>
              ) : null}
              {i < record.length - 1 ? <div className="bm-hand-rule bm-hand-rule--faint" style={{ marginTop: "var(--space-8)", width: "62%" }} /> : null}
            </Reveal>
          ))}
          <div style={{ padding: "0 0 var(--space-9)" }}>
            <TextLink micro mark="→" href="/catalogue">
              Catalogue
            </TextLink>
          </div>
        </article>
        <aside style={{ gridColumn: "10 / span 3", position: "sticky", top: 110, alignSelf: "start", marginTop: "var(--space-10)" }}>
          <Sheet off>
            <Stamped className="bm-micro" as="div" amount={1}>
              Filing state
            </Stamped>
            <div className="bm-data" style={{ fontSize: "15px", color: "var(--text-faint)", lineHeight: 2, marginTop: "var(--space-4)" }}>
              <div>ACCOUNTS · 9</div>
              <div>AGREEMENT · NONE</div>
              <div>ORIGIN · UNEXPLAINED</div>
              <div style={{ color: "var(--text-accent)" }}>DATES · DISPUTED</div>
            </div>
          </Sheet>
        </aside>
      </div>
    </main>
  );
}
