import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useOvermind } from "stores/Overmind";
import {
  ImageUploadElement,
  photoUpload,
} from "components/utility/ImgUploadElement";
import Input from "mintflow/Input";
import Button from "mintflow/Button";
import Alert from "mintflow/Alert";
import { CheckIcon } from "@heroicons/react/24/solid";
import { TierSelect } from "components/NFT/NFTUploadWidget";
import { TIER_VARIANTS } from "mintflow/Tiercard/Tiercard";
import { PostEditor } from "components/NFT/NFTUploadFields";
import { useMatchMutate } from "utils/useMatchMutate";
import LoadingAnimationCircle from "components/utility/LoadingAnimationCircle";

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default function EditLink({ link, token, setEditLink }: any) {
  const { state: ostate, actions } = useOvermind();
  const [hidden, setHidden] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();
  const [descr, setDescr] = useState<string>();
  const [photo, setPhoto] = useState<string>();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [img, setImg] = useState<string>();
  const [release_date, setReleaseDate] = useState<string | null>();
  const [releaseOption, setReleaseOption] = useState<boolean>(
    release_date ? true : false
  );
  const imageUpload = useRef();
  const mutateMatch = useMatchMutate();

  const [waiting, setWaiting] = useState(false);
  //console.log('release_date', release_date);
  //console.log('link', link);

  // const linkType = link?.media;

  // useEffect(() => {
  //   if (open) setEdit(true);
  //   if (release_date) setReleaseOption(true);
  // }, [open, release_date]);

  function onDelete(e) {
    if (e) e.preventDefault();
    let isExecuted = confirm("Are you sure you want to delete this link?");
    if (!isExecuted) return;

    const url = new URL(`${TPP}/api/v2/links/delete`);
    url.searchParams.set("id", link.id);
    url.searchParams.set("jwt", ostate.user.jwt);

    setWaiting(true);
    fetch(url.toString(), {
      method: "POST",
    }).finally(() => {
      setWaiting(false);
      close();
    });
  }

  async function close() {
    setAlertOpen(false);
    if (setEditLink) setEditLink(false);
    await mutateMatch(/\/feed/);
  }

  useEffect(() => {
    async function linkInfo() {
      let url = new URL(`${TPP}/api/v2/links/linkid`);
      url.searchParams.set("id", link?.id);
      url.searchParams.set("cb", Date.now().toString());
      const data = await fetch(url.href).then((resp) => resp.json());
      setHidden(data?.hidden);
      setTitle(data?.title);
      setDescr(data?.descr);
      setImg(data?.img);
      setPhoto(data?.img);
      setReleaseDate(data?.release_date);
    }
    linkInfo();
  }, []);

  const [tier, setTier] = useState<0 | 1 | 2 | 3>(link.tier || 0);

  const onUpdate = useCallback(async () => {
    const url = new URL(`${TPP}/api/v2/links/update`);
    url.searchParams.set("id", link?.id);
    url.searchParams.set("jwt", ostate.user.jwt);
    if (hidden !== null) url.searchParams.set("hidden", hidden.toString());
    if (title) url.searchParams.set("title", title);
    if (descr) url.searchParams.set("descr", descr);
    url.searchParams.set("tier", tier.toString());
    url.searchParams.set(
      "release_date",
      release_date ? release_date.toString() : null
    );

    var imgURL = null;
    if (img !== photo) imgURL = await photoUpload(imageUpload, "profile");
    if (imgURL) url.searchParams.set("img", imgURL);

    await fetch(url.href, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify({}),
      },
    })
      .then((x) => x.json())
      .then((r) => {
        setTitle(title);
        setImg(img);
        setDescr(descr);
        setHidden(hidden);
        setReleaseDate(release_date);
        if (r && r.status === "fail") {
          alert("Could not save: " + r.message);
          setAlertOpen(true);
          setAlertMessage("Could not save: " + r.message);
        } else {
          return r;
        }
      })
      .catch((e) => {
        alert(e);
      })
      .finally(() => {
        setWaiting(false);
        close();
      });
  }, [
    tier,
    imageUpload,
    title,
    img,
    descr,
    hidden,
    release_date,
    ostate.user.jwt,
    link,
  ]);

  if (!descr)
    return (
      <p>
        <LoadingAnimationCircle />
      </p>
    );

  return (
    <div className="flex flex-col w-full">
      <Alert open={alertOpen} icon={<CheckIcon className="w-5 h-5" />}>
        {alertMessage}
      </Alert>

      {
        <div className="flex flex-col space-y-4">
          <p className="title text-base-content">Edit your post</p>
          {/* 
          <p className="title italic text-sm font-light">id: {link?.id}</p>
          <Input
            variant="primary"
            label="Title"
            type="text"
            name={link?.title || ""}
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value.toString())}
            className="w-full"
          />
          */}
          <div className="textarea bg-base-100 border border-base-300">
            <PostEditor value={descr} onChange={(v) => setDescr(v)} />
          </div>
          {/* 
          <div className="label">
            <label
              htmlFor="name"
              className="label-text base1 text-base-content"
            >
              Locked Preview Image
            </label>
          <ImageUploadElement
            imgP={img}
            setImgP={setImg}
            imageUpload={imageUpload}
          />
          </div>
          */}

          {/* 
          {(linkType === "ebk" || linkType === "vid" || linkType === "aud") && (
            <ReleaseDate
              updateOption={releaseOption}
              setUpdatedOption={setReleaseOption}
              newDate={release_date}
              setDate={setReleaseDate}
              modal={false}
            ></ReleaseDate>
          )}
          <div className="mt-6 flex flex-row justify-between">
            <div className="flex">
              <label
                htmlFor="hidden"
                className="tracking-wide uppercase block text-md font-semibold text-base-content mb-2"
              >
                Hide link from profile and feed?
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                defaultChecked={hidden}
                checked={hidden}
                onChange={(e) => setHidden(!hidden)}
                className={"toggle toggle-md hover:bg-primary"}
              />
            </div>
          </div>
          */}

          {!waiting && (
            <div className="w-full flex justify-end space-x-4">
              <Button variant="warning" id="deleteLink" onClick={onDelete}>
                Delete
              </Button>
              <Button variant="primary" onClick={onUpdate}>
                Save
              </Button>
            </div>
          )}
          {waiting && <p>Please wait...</p>}
        </div>
      }
    </div>
  );
}

// export function SelectTier() {
//   return <
// }
