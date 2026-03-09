"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function AdminCharts() {
  useEffect(() => {
        const drawCharts = async () => {
            const google = (window as any).google;
            if (!google) return;

            google.charts.load("current", { packages: ["corechart"] });
            google.charts.setOnLoadCallback(async () => {

                // --- KORICE ---
                const resKorice = await fetch("/api/auth/admin/chart/korice");
                const resultKorice = await resKorice.json();
                const dataKorice = google.visualization.arrayToDataTable(resultKorice);

                const optionsKorice = {
                    title: "Najčešće naručivane korice",
                    legend: { position: "none" },
                    backgroundColor: "#F3E8FF",
                    colors: ["#6A0DAD"]
                };

                const koriceChart = new google.visualization.BarChart(document.getElementById("koriceChart"));
                koriceChart.draw(dataKorice, optionsKorice);

                // --- STIKERI ---
                const resStikeri = await fetch("/api/auth/admin/chart/stikeri");
                const resultStikeri = await resStikeri.json();
                const dataStikeri = google.visualization.arrayToDataTable(resultStikeri);

                const optionsStikeri = {
                    title: "Najčešće naručivani stikeri",
                    backgroundColor: "#F3E8FF",
                    colors: ["#efa7b6","#e270a4","#dd4a6a","#e25ac3","#9d22d6","#480d72","#6b0ab1","#cf84e6"],
                    chartArea: { width: "80%", height: "70%" }
                };

                const stikeriChart = new google.visualization.PieChart(document.getElementById("stikeriChart"));
                stikeriChart.draw(dataStikeri, optionsStikeri);

            });
        };
        drawCharts();
    }, []);

    return (
        <>
        <Script src="https://www.gstatic.com/charts/loader.js" strategy="beforeInteractive" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div id="koriceChart" style={{ width: "100%", height: "300px" }} />
            <div id="stikeriChart" style={{ width: "100%", height: "350px" }} />
        </div>
        </>
    );
}