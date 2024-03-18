export const roundedDoughnutPlugin = {
  id: "drawСircles",
  afterUpdate(chart: any) {
    const arcs = chart.getDatasetMeta(0).data;

    arcs.forEach((arc: any) => {
      arc.round = {
        x: (chart.chartArea.left + chart.chartArea.right) / 2,
        y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
        radius: (arc.outerRadius + arc.innerRadius) / 2,
        thickness: (arc.outerRadius - arc.innerRadius) / 2,
        backgroundColor: arc.options.backgroundColor,
      };
    });
  },
  afterDraw: (chart: any) => {
    const { ctx } = chart;

    chart.getDatasetMeta(0).data.forEach((arc: any) => {
      const endAngle = Math.PI / 2 - arc.endAngle;

      ctx.save();
      ctx.translate(arc.round.x, arc.round.y);
      ctx.fillStyle = arc.options.backgroundColor;
      ctx.beginPath();
      ctx.arc(
        arc.round.radius * Math.sin(endAngle),
        arc.round.radius * Math.cos(endAngle),
        arc.round.thickness,
        0,
        2 * Math.PI,
      );
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });
  },
};
