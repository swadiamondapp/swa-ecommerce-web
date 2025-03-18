"use client";

import React, { useContext } from "react";
import Classes from "./bring-the-party.module.css";
import { DataContext } from "@/providers/data-provider";
import Link from "next/link";
import Image from "next/image";
import { useData } from "@/providers/data-provider";

function BringTheParty() {
  const { add } = useContext(DataContext);
  const { categories, tags } = useData();

  return (
    <div className="container bringthepartpage">
      <div className={Classes.BringThePartyWhole}>
        <div className={`container ${Classes.MobBringtheparty}`}>
          <div className="row">
            <div className={`col-md-12 ${Classes.MobBringtheparty}`}>
              <div className={`container ${Classes.MobBringtheparty}`}>
                <div className="row">
                  {add?.map((item, index) => (
                    <Link
                      href={
                        item.is_category
                          ? `/${categories.find(
                              (category) => category.id == item.type_id
                            ).name.toLowerCase()} `
                          : `/${tags.find(
                              (tag) => tag.id == item.type_id
                            ).name.toLowerCase()}`
                      }
                      key={index}
                    >
                      {item.Ad_image && (
                        <div
                          className={`col-md-12 ${Classes.MobBringtheparty}`}
                        >
                          <Image
                            className={Classes.Image1}
                            src={item.Ad_image && item.Ad_image}
                            alt="ad1"
                            width={1000}
                            height={1000}
                          />
                        </div>
                      )}
                      {item.Ad_video && (
                        <div
                          className={`col-md-6 ${Classes.MobBringthepartyvideo}`}
                        >
                          <video
                            className={Classes.Video1}
                            src={item.Ad_video}
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       
    </div>
  );
}

export default BringTheParty;
