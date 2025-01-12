"use client";
import { useAppSelector } from "@/store/useAppSelector";
import Button from "../Button";
import { SyntheticEvent, useEffect, useState } from "react";
import Input from "../Input";
import TextArea from "../TextArea";
import {
  AnnouncementData,
  useCreateAnnouncement,
  useUpdateAnnouncement,
} from "@/api/announcement";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";

export const text = `
<i><p>
Hello Students, <br />
We are excited to announce a Live Career Advice Session on October 25th at 11:00 AM (WAT), exclusively for users! Join us as industry experts share insights on preparing for the job market, building a strong resume, and acing interviews. This is a great opportunity to ask questions and get personalized advice on your career path.
<br /><br />
<b>Topics Covered:</b><br />
How to Craft a Winning Resume, Tips for Networking in Your Field, Interview Do's and Don'ts, Career Growth Strategies.
<br /><br />
Simply Add to your schedule by clicking on the 'Add to Schedule’ button below. Don’t miss out on this chance to gain valuable insights that can boost your career!
<br /><br />
For more information, reach out to our team at <a href="mailto:">career@edulinker.com</a>.
<br /><br />
Looking forward to seeing you there!
<br /><br />
Best Regards,<br />
Dr. Amarachi Orji
</p></i>
`;

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
  const {
    auth: { user },
  } = useAppSelector((s) => s);
  const role = user?.role;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { id } = useParams();
  useEffect(() => {
    // @ts-ignore
    setIsEdit(isNew);
  }, [isNew]);
  const [title, setTitle] = useState<string>(announcement?.title ?? "");
  const [content, setContent] = useState<string>(announcement?.content ?? "");

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
    setContent("");
  };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
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
            annId: announcement._id as string,
            announcement: { title, content },
          },
          { onSuccess }
        );
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
        } bg-[#F9FAFB] w-full md:max-w-[500px] lg:max-w-[514px] transition-[right] easein duration-[750ms]`}
      >
        <div className="bg-white h-20 lg:h-[108px] border-b border-[#F3F3F3] flex items-center px-5 gap-3 sticky top-0">
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
              <TextArea
                label="Announcements Details"
                placeholder="Announcements Details"
                className="min-h-[400px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
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
                    {moment(announcement?.createdAt).format("d MMM yyyy")}
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
