"use client";

import React from "react";
import Classes from "./shop-on-budget.module.css";
import { DataContext } from "@/providers/data-provider";
import { useContext } from "react";
import BudgetCard from "./budgetCard/budget-card";
import { useRouter } from "next/navigation";

function ShopOnBudget() {
  const { budjet } = useContext(DataContext);
  const router = useRouter();
  const productMinHandler = (price) => {
    router.push(`/jewellery/budget/${price}`);
  };

  return (
    <div className="container">
      <div className="row mobRow1">
        <div>
          <div className={Classes.ShopOnBudgetText}>
            <div className={Classes.ShopOnBudgetMainText}>
              <h1>Shop on Budget</h1>
            </div>
            <p className={Classes.ShopOnBudgetSubText}>
              We have every style at your affordable budget
            </p>
          </div>
          <div className={Classes.ShopOnBudgetImages}>
            <div className="container">
              <div className="row">
                {budjet.slice(0, 4)?.map((item, index) => (
                  <BudgetCard
                    key={index}
                    budget={item}
                    index={index}
                    clicked={() => productMinHandler(item.budget)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopOnBudget;
