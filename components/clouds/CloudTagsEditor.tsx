"use client";

import { CLOUDS, type CloudSlug } from "@/lib/clouds";

interface CloudTagsEditorProps {
  value: CloudSlug[] | undefined;
  onChange: (next: CloudSlug[]) => void;
  disabled?: boolean;
}

export function CloudTagsEditor({ value, onChange, disabled }: CloudTagsEditorProps) {
  const tags = value ?? [];

  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="font-semibold mb-2 text-gray-900">Cloud Tags</h3>
      <p className="text-sm text-gray-500 mb-3">
        Assign this tool to one or more VCM Clouds. Tools without tags break the flywheel.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {CLOUDS.map((cloud) => {
          const checked = tags.includes(cloud.slug);
          return (
            <label
              key={cloud.slug}
              className={`flex items-start gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                checked ? "bg-orange-50 border-orange-300" : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <input
                type="checkbox"
                className="mt-1 accent-orange-500"
                checked={checked}
                disabled={disabled}
                onChange={() => {
                  if (disabled) return;
                  if (checked) {
                    onChange(tags.filter((t) => t !== cloud.slug));
                  } else {
                    onChange([...tags, cloud.slug]);
                  }
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-gray-900">{cloud.name}</div>
                <div className="text-xs text-gray-500 truncate">
                  {cloud.shortDescription}
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
