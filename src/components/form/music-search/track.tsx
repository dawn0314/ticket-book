import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { styled, css } from "styled-components";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export const Track = ({ id, title, selectedTracks, setSelectedTracks }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleDeleteTrack = (e) => {
    const updatedTracks = selectedTracks.filter((track) => track.id !== id);
    setSelectedTracks(updatedTracks);
  };

  return (
    <TrackItem ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <DragIcon className="drag-icon" />
      {title}
      <RemoveIcon className="remove-icon" onClick={handleDeleteTrack} />
    </TrackItem>
  );
};

const styledTrack = css`
  padding: 8px;
  border-radius: 20px;
  margin: 2px 2px;
  max-width: 230px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #eee;
  }

  &:hover .drag-icon,
  &:hover .remove-icon {
    display: block !important;
  }
`;

const TrackItem = styled.div`
  ${styledTrack}
`;

const DragIcon = styled(DragIndicatorIcon)`
  display: none !important;
  font-size: 12px;
  stroke: #eee;
  stroke-width: 1;
  margin-right: 2px;
  cursor: pointer;
`;

const RemoveIcon = styled(RemoveCircleIcon)`
  color: red;
  display: none !important;
  margin-left: auto;
  cursor: pointer;
`;
