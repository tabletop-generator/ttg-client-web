"use client";

import { useAuth } from "@/context/auth-provider";
import { createAsset } from "@/lib/create-asset";
import type { components } from "@/types/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type CreateAssetInputs =
  components["requestBodies"]["assetCreate"]["content"]["application/json"];

const visibilityInputs: components["schemas"]["asset"]["visibility"][] = [
  "private",
  "public",
  "unlisted",
];

const characterClassInputs: components["schemas"]["characterCreate"]["class"][] =
  [
    "barbarian",
    "bard",
    "cleric",
    "druid",
    "fighter",
    "monk",
    "paladin",
    "ranger",
    "rogue",
    "sorcerer",
    "warlock",
    "wizard",
  ];

const characterRaceInputs: components["schemas"]["characterCreate"]["race"][] =
  [
    "dragonborn",
    "drow",
    "dwarf",
    "elf",
    "githyanki",
    "gnome",
    "half_elf",
    "half_orc",
    "halfling",
    "human",
    "tiefling",
  ];

const characterGenderInputs: components["schemas"]["characterCreate"]["gender"][] =
  ["male", "female", "agender", "genderfluid", "non_binary"];

const characterAlignmentInputs: components["schemas"]["characterCreate"]["alignment"][] =
  [
    "chaotic_evil",
    "chaotic_good",
    "chaotic_neutral",
    "lawful_evil",
    "lawful_good",
    "lawful_neutral",
    "neutral_evil",
    "neutral_good",
    "true_neutral",
  ];

export default function CreatePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAssetInputs>();

  const router = useRouter();
  const { session } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(data: CreateAssetInputs) {
    console.debug(data);

    if (!session) {
      return;
    }

    setLoading(true);

    try {
      const newAsset = await createAsset(data, session.access_token);
      router.push(`/assets/${newAsset.assetId}`);
    } catch (error) {
      setError(JSON.stringify(error));
      setLoading(false);
      return;
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="label mb-1 text-sm">Name</label>
      <label className="input w-full">
        <input {...register("name", { required: "Name is required." })} />
      </label>
      <p className="text-error mt-2 min-h-6 text-[0.75rem]">
        {errors.name?.message}
      </p>
      <label className="label mb-1 text-sm">Visibility</label>
      <select
        {...register("visibility", { required: "Visibility is required." })}
        className="select w-full capitalize"
      >
        {visibilityInputs.map((v) => (
          <option value={v} key={v} className="capitalize">
            {v}
          </option>
        ))}
      </select>
      <p className="text-error mt-2 min-h-6 text-[0.75rem]">
        {errors.visibility?.message}
      </p>
      {/* name of each tab group should be unique */}
      <div className="tabs tabs-border">
        <input
          type="radio"
          className="tab"
          aria-label="Character"
          value="character"
          defaultChecked
          {...register("assetType", { required: "Asset type is required." })}
        />
        <div className="tab-content border-base-300 bg-base-100 p-10">
          <label className="label mb-1 text-sm">Class</label>
          <select
            {...register("data.class", { required: "Class is required." })}
            className="select w-full capitalize"
          >
            {characterClassInputs.map((v) => (
              <option value={v} key={v} className="capitalize">
                {v}
              </option>
            ))}
          </select>
          <p className="text-error mt-2 min-h-6 text-[0.75rem]">
            {errors.data?.message}
          </p>
          <label className="label mb-1 text-sm">Race</label>
          <select
            {...register("data.race", { required: "Race is required." })}
            className="select w-full capitalize"
          >
            {characterRaceInputs.map((v) => (
              <option value={v} key={v} className="capitalize">
                {v}
              </option>
            ))}
          </select>
          <p className="text-error mt-2 min-h-6 text-[0.75rem]">
            {errors.data?.message}
          </p>
          <label className="label mb-1 text-sm">Gender</label>
          <select
            {...register("data.gender", { required: "Gender is required." })}
            className="select w-full capitalize"
          >
            {characterGenderInputs.map((v) => (
              <option value={v} key={v} className="capitalize">
                {v}
              </option>
            ))}
          </select>
          <p className="text-error mt-2 min-h-6 text-[0.75rem]">
            {errors.data?.message}
          </p>
          <label className="label mb-1 text-sm">Alignment</label>
          <select
            {...register("data.alignment", {
              required: "Alignment is required.",
            })}
            className="select w-full capitalize"
          >
            {characterAlignmentInputs.map((v) => (
              <option value={v} key={v} className="capitalize">
                {v}
              </option>
            ))}
          </select>
          <p className="text-error mt-2 min-h-6 text-[0.75rem]">
            {errors.data?.message}
          </p>
        </div>

        <input
          type="radio"
          className="tab"
          aria-label="Location"
          value="location"
          {...register("assetType", { required: "Asset type is required." })}
        />
        <div className="tab-content border-base-300 bg-base-100 p-10">
          Coming soon!
        </div>

        <input
          type="radio"
          className="tab"
          aria-label="Map"
          value="map"
          {...register("assetType", { required: "Asset type is required." })}
        />
        <div className="tab-content border-base-300 bg-base-100 p-10">
          Coming soon!
        </div>
      </div>
      <p className="text-error my-2 min-h-6 text-center text-[0.75rem]">
        {error}
      </p>
      <div className="card-actions justify-center">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          Create
        </button>
      </div>
    </form>
  );
}
