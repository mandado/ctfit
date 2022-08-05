import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Table } from "@tanstack/react-table";

export default function ColumnsVisibility({ table }: { table: Table<any> }) {
  return (
    <div className="text-right">
      <Menu as="div" className="relative block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Mostrar/Esconder colunas
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-30 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {table.getAllLeafColumns().map((column) => {
                return (
                  <Menu.Item key={column.id}>
                    {({ active }) => (
                      <label
                        className={`${
                          active ? "bg-gray-500 text-white" : "text-gray-900"
                        } group flex  w-full items-center space-x-2 rounded-md px-2 py-2 text-sm`}
                      >
                        <input
                          {...{
                            type: "checkbox",
                            checked: column.getIsVisible(),
                            onChange: column.getToggleVisibilityHandler(),
                            className:
                              "focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300 rounded",
                          }}
                        />
                        <p>{column.columnDef.header}</p>
                      </label>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
