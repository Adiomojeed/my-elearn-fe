import { ModuleData } from "@/api/course";
import Accordion from "@/components/Accordion";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import LessonCard from "./LessonCard";
import LessonModal from "@/components/modals/LessonModal";
import useDisclosure from "@/hooks/useDisclosure";

const ModuleCard = ({ module, id }: { module: ModuleData; id: number }) => {
  const [title, setTitle] = useState(module?.title);
  useEffect(() => {
    setTitle(module.title);
  }, [module]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Accordion
      className="rounded-lg bg-white border border-[#F3F3F3]"
      titleClassName="border-b border-[#F3F3F3]"
      title={
        <div className="flex w-full items-center gap-4 justify-between">
          <small className="font-medium">
            Module {id} : {title}
          </small>
          <Button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="px-4 text-xs mr-2"
            size="sm"
          >
            {module.isVisible ? "Hide" : "Unhide"}
          </Button>
        </div>
      }
      content={
        <div className="p-3 md:p-4 lg:px-12 ">
          <div className="flex flex-col divide-y divide-[#F3F3F3] gap-3 lg:gap-3">
            <form className="flex items-end gap-3">
              <Input
                label="Module Title"
                placeholder="Module title"
                size="md"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-[280px] md:w-[300px]"
                required
              />
              <Button className="px-4 text-xs " size="sm">
                Save
              </Button>
            </form>
            {module?.lessons?.map((i, idx) => (
              <LessonCard key={idx} lesson={i} module={module._id as string} />
            ))}
            <Button
              type="submit"
              className="px-4 text-sm mt3 ml-auto w-max"
              size="md"
              onClick={onOpen}
            >
              Add new lesson
            </Button>
            <LessonModal
              isOpen={isOpen}
              onClose={onClose}
              module={module._id as string}
            />
          </div>
        </div>
      }
    />
  );
};

export default ModuleCard;
