import { useState, type ReactNode } from "react";

type Props = {
  title: string;
  loading: boolean;
  plainText: string;
  override: string | null;
  onCopy: () => void;
  onRegenerate: () => void;
  onSaveEdit: (text: string | null) => void;
  children: ReactNode;
};

export function ActionPill({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 rounded-full bg-background py-1.5 pl-2.5 pr-3 text-xs font-medium text-muted-foreground ring-1 ring-border transition-colors hover:bg-card hover:text-foreground disabled:opacity-50"
    >
      <span className="dot bg-muted-foreground/50" />
      {label}
    </button>
  );
}

export function ResultSection({ title, loading, plainText, override, onCopy, onRegenerate, onSaveEdit, children }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          <span className="dot bg-accent" />
          {title}
          {override && <span className="text-[11px] font-sans font-medium text-muted-foreground">(edited)</span>}
        </h3>
        <div className="flex flex-wrap items-center gap-1.5">
          <ActionPill label="Copy" onClick={onCopy} disabled={loading} />
          <ActionPill label="Regenerate" onClick={onRegenerate} disabled={loading || editing} />
          <ActionPill
            label={editing ? "Cancel" : "Edit"}
            disabled={loading}
            onClick={() => {
              if (!editing) setDraft(override ?? plainText);
              setEditing(!editing);
            }}
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-2.5 rounded-xl bg-background p-4 ring-1 ring-border">
          <div className="flex items-center gap-2">
            <span className="dot skel bg-primary" />
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Writing {title.toLowerCase()}…</span>
          </div>
          <div className="skel h-3 w-3/4 rounded-full bg-border" />
          <div className="skel h-3 w-full rounded-full bg-border" />
          <div className="skel h-3 w-1/2 rounded-full bg-border" />
        </div>
      ) : editing ? (
        <div>
          <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={14} className="field font-sans leading-relaxed" />
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => { onSaveEdit(draft); setEditing(false); }}
              className="rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary-deep"
            >
              Save changes
            </button>
            {override && (
              <button type="button" onClick={() => { onSaveEdit(null); setEditing(false); }} className="rounded-full px-4 py-2 text-xs font-medium text-muted-foreground ring-1 ring-border hover:bg-card">
                Revert to generated
              </button>
            )}
          </div>
        </div>
      ) : override ? (
        <div className="whitespace-pre-wrap rounded-xl bg-background p-4 text-[15px] leading-relaxed ring-1 ring-border">{override}</div>
      ) : (
        children
      )}
    </section>
  );
}
