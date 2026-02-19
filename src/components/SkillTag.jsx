import { useMemo, useState } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';

function SortableTag({ skill, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: skill });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <motion.span
      layout
      ref={setNodeRef}
      style={style}
      className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow-md"
      initial={{ opacity: 0, scale: 0.86 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ y: -1 }}
    >
      <span className="cursor-grab" {...attributes} {...listeners}>
        {skill}
      </span>
      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          onRemove(skill);
        }}
        className="rounded-full px-1 leading-none hover:bg-black/20"
      >
        ×
      </button>
    </motion.span>
  );
}

export default function SkillTag({ skills, setSkills }) {
  const [input, setInput] = useState('');
  const sensors = useSensors(useSensor(PointerSensor));

  const ids = useMemo(() => skills, [skills]);

  const addSkill = () => {
    const value = input.trim();
    if (!value || skills.includes(value)) return;
    setSkills((prev) => [...prev, value]);
    setInput('');
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addSkill();
    }
  };

  const removeSkill = (skill) => setSkills((prev) => prev.filter((item) => item !== skill));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setSkills((prev) => {
      const oldIndex = prev.indexOf(active.id);
      const newIndex = prev.indexOf(over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  return (
    <div>
      <label className="mb-2 block text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Skills</label>
      <div className="mb-2 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Add skill and press Enter"
          className="form-input"
        />
        <button type="button" onClick={addSkill} className="action-btn btn-primary">
          Add
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={ids} strategy={horizontalListSortingStrategy}>
          <div className="flex min-h-10 flex-wrap gap-2 rounded-xl border border-slate-200 bg-white/72 p-2 dark:border-slate-700 dark:bg-slate-900/62">
            {skills.map((skill) => (
              <SortableTag key={skill} skill={skill} onRemove={removeSkill} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
