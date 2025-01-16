"use client";
import { convertToRaw, EditorState, ContentState } from "draft-js";
import { useAppSelector } from "@/store/useAppSelector";
import Button from "../Button";
import { SyntheticEvent, useEffect, useState } from "react";
import Input from "../Input";
import TextArea, { RichEditor } from "../TextArea";
import {
  AnnouncementData,
  useCreateAnnouncement,
  useUpdateAnnouncement,
} from "@/api/announcement";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";

let htmlToDraft = null;
let draftToHtml = null;
if (typeof window === "object") {
  htmlToDraft = require("html-to-draftjs").default;
  draftToHtml = require("draftjs-to-html");
}

const AnnouncementModal = ({
  isOpen,
  onClose,
  announcement,
}: {
  isOpen: boolean;
  onClose: () => void;
  announcement?: AnnouncementData;
}) => {
  const isNew = !announcement;
  const { user } = useAppSelector((s) => s.auth);
  const role = user?.role;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { id } = useParams();
  useEffect(() => {
    // @ts-ignore
    setIsEdit(isNew);
  }, [isNew]);
  const [title, setTitle] = useState<string>(announcement?.title ?? "");

  let contentState;
  if (announcement?.content) {
    const blocksFromHtml = htmlToDraft(announcement?.content);
    const { contentBlocks, entityMap } = blocksFromHtml;
    contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  }
  const editorsState =
    contentState && EditorState.createWithContent(contentState);

  const [editorState, setEditorState] = useState(
    editorsState || EditorState.createEmpty()
  );

  useEffect(() => {
    setTitle(announcement?.title ?? "");
    setEditorState(editorsState || EditorState.createEmpty());
  }, [announcement]);

  const { mutate: createAnnouncement, isPending } = useCreateAnnouncement();
  const { mutate: updateAnnouncement, isPending: updating } =
    useUpdateAnnouncement();
  const queryClient = useQueryClient();
  const onSuccess = () => {
    onClose();
    queryClient.invalidateQueries({
      queryKey: ["getAnnouncements"],
    });
    setTitle("");
  };
  const [error, setError] = useState(false);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    if (
      !convertToRaw(editorState.getCurrentContent()).blocks.some(
        (i) => i.text.length > 0
      )
    ) {
      setError(true);
    } else {
      setError(false);
      isNew
        ? createAnnouncement(
            {
              courseId: id as string,
              announcement: { title, content },
            },
            { onSuccess }
          )
        : updateAnnouncement(
            {
              annId: announcement?._id as string,
              announcement: { title, content },
            },
            { onSuccess }
          );
    }
  };
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="absolute left-0 top-0 z-[101] h-screen w-screen bg-black bg-opacity-10"
        ></div>
      )}
      <div
        className={`absolute z-[101] h-full top-0 ${
          isOpen
            ? "right-0"
            : "-right-[100%] md:-right-[500px] lg:-right-[514px]"
        } bg-[#F9FAFB] w-full md:max-w-[500px] lg:max-w-[514px] overflow-y-auto transition-[right] easein duration-[750ms]`}
      >
        <div className="bg-white h-20 lg:h-[108px] border-b border-[#F3F3F3] flex items-center px-5 gap-3 sticky top-0 z-[101]">
          <Button
            onClick={onClose}
            size="sm"
            btnType="outline"
            className="px-3 !border-[#F3F3F3]"
          >
            <img src="/arrow-back.svg" alt="arrow-back icon" />
          </Button>
          <small className="text-grey-300 line-clamp-1">
            Annoucements /{" "}
            <span className="text-primary-500">
              {isNew ? "New Post" : announcement?.title}
            </span>
          </small>
        </div>
        <div className="p-4 md:p-5">
          {isEdit ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="Announcements Title"
                placeholder="Input Title here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <div>
                <RichEditor
                  label="Announcements Details"
                  placeholder="Announcements Details"
                  className="min-h-[400px]"
                  // @ts-ignore
                  value={editorState}
                  onChange={(e) => setEditorState(e)}
                  required
                />
                {error && (
                  <small className="text-red-400 mt-2">
                    Announcement details is required
                  </small>
                )}
              </div>

              <div className="flex gap-4 items-center">
                {!isNew && (
                  <Button
                    onClick={() => setIsEdit(false)}
                    btnType="outline"
                    className="px-6 text-sm"
                    size="md"
                    type="button"
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  isLoading={isPending ?? updating}
                  type="submit"
                  className="px-6 text-sm"
                  size="md"
                >
                  Submit
                </Button>
              </div>
            </form>
          ) : (
            <div className="border border-[#F3F3F3] p-5 rounded-lg bg-white">
              <div className="flex items-center">
                <p className="lg:text-lg leading-[22px] font-medium line-clamp-1">
                  {announcement?.title}
                </p>
                {role !== "student" && (
                  <Button
                    onClick={() => setIsEdit(true)}
                    btnType="outline"
                    size="sm"
                    className="ml-auto px-2"
                  >
                    <img
                      src="/pen.svg"
                      className="hover:bg-green-200"
                      alt="edit icon"
                    />
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-4 mt-2">
                {role === "student" && (
                  <small className="text-grey-300 leading-[20px] flex items-center gap-1">
                    <img src="/user.svg" alt="user icon" />{" "}
                    <span className="mt-1">
                      Dr. {announcement?.createdBy?.firstname}{" "}
                      {announcement?.createdBy.lastname}
                    </span>
                  </small>
                )}
                <small className="text-grey-300 leading-[20px] flex items-center gap-1">
                  <img src="/calendar.svg" alt="calendar icon" />{" "}
                  <span className="mt-1">
                    {moment(announcement?.createdAt).format("DD MMM yyyy")}
                  </span>
                </small>
                <small className="text-grey-300 leading-[20px] flex items-center gap-1">
                  <img src="/clock.svg" alt="clock icon" />{" "}
                  <span className="mt-1">
                    {moment(announcement?.createdAt).format("hh:mm A")}
                  </span>
                </small>
              </div>
              <div className="mt-6 ml-3 pl-5 border-l-2 border-[#F3F3F3]">
                <p
                  className="text-sm md:text-basetext-grey-400 wysiwyg-render"
                  dangerouslySetInnerHTML={{
                    __html: announcement?.content as string,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AnnouncementModal;
