import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function Item({ id, label }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="cursor-grab rounded-xl border border-slate-200 bg-white/82 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/68 dark:text-slate-200"
      {...attributes}
      {...listeners}
    >
      {label}
    </div>
  );
}

export default function LayoutBuilder({ order, setOrder }) {
  const sensors = useSensors(useSensor(PointerSensor));

  const labels = {
    avatar: 'Avatar',
    nameRole: 'Name + Role',
    bio: 'Bio',
    meta: 'Meta',
    skills: 'Skills',
    links: 'Links'
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setOrder((prev) => {
      const oldIndex = prev.indexOf(active.id);
      const newIndex = prev.indexOf(over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  return (
    <div className="panel">
      <p className="section-title">Layout Composer</p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={order} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 gap-2">
            {order.map((id) => (
              <Item key={id} id={id} label={labels[id] ?? id} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
