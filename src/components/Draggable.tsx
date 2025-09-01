import React, { useState, useEffect, useRef } from 'react';

export const Draggable: React.FC = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isExpanded, setIsExpanded] = useState(false);

  const dragInfo = useRef({
    isDragging: false,
    wasDragged: false,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragInfo.current.isDragging) {
        const dx = Math.abs(e.clientX - dragInfo.current.startX);
        const dy = Math.abs(e.clientY - dragInfo.current.startY);
        if (dx > 5 || dy > 5) {
          dragInfo.current.wasDragged = true;
        }
        setPosition({
          x: e.clientX - dragInfo.current.offsetX,
          y: e.clientY - dragInfo.current.offsetY,
        });
      }
    };

    const handleMouseUp = () => {
      if (dragInfo.current.isDragging) {
        if (!dragInfo.current.wasDragged) {
          setIsExpanded(prev => !prev);
        }
        dragInfo.current.isDragging = false;
        // After the drag is finished, make the window click-through again.
        window.ipcRenderer.send('set-ignore-mouse-events', true, { forward: true });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (isExpanded) {
      window.ipcRenderer.send('resize-window', 100, 300);
    } else {
      window.ipcRenderer.send('resize-window', 150, 150);
    }
  }, [isExpanded]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    dragInfo.current = {
      isDragging: true,
      wasDragged: false,
      startX: e.clientX,
      startY: e.clientY,
      offsetX: e.clientX - position.x,
      offsetY: e.clientY - position.y,
    };
    // When the drag starts, immediately make the window interactive.
    window.ipcRenderer.send('set-ignore-mouse-events', false);
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: 'grab',
        width: '100px',
        height: isExpanded ? '300px' : '100px',
      }}
      onMouseDown={handleMouseDown}
    >
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'lightblue',
        borderRadius: isExpanded ? '10px' : '50%',
        transition: 'all 0.3s ease',
        pointerEvents: 'none',
      }} />
    </div>
  );
};





