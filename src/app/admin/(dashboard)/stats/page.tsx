import {
  InquiriesByProjectChart,
  InquiriesChart,
  TopPropertiesChart,
  VisitsChart,
} from "@/components/admin/stats-charts";
import {
  getInquiriesByProject,
  getInquiriesTrend,
  getMostViewedProperties,
  getTotalVisits,
  getVisitsTrend,
} from "@/lib/data/admin";

export default async function AdminStatsPage() {
  const [visitsTrend, inquiriesTrend, inquiriesByProject, topProperties, totalVisits] =
    await Promise.all([
      getVisitsTrend(),
      getInquiriesTrend(),
      getInquiriesByProject(),
      getMostViewedProperties(),
      getTotalVisits(),
    ]);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Statistiques</h1>
        <div className="card-premium px-5 py-3 text-sm">
          <span className="text-blanc/60">Visites totales : </span>
          <span className="font-display text-lg font-bold text-or-clair">{totalVisits}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card-premium p-6">
          <h2 className="mb-4 font-display text-lg font-semibold">
            Visites du site (30 derniers jours)
          </h2>
          <VisitsChart data={visitsTrend} />
        </div>

        <div className="card-premium p-6">
          <h2 className="mb-4 font-display text-lg font-semibold">
            Demandes de contact (30 derniers jours)
          </h2>
          <InquiriesChart data={inquiriesTrend} />
        </div>

        <div className="card-premium p-6">
          <h2 className="mb-4 font-display text-lg font-semibold">
            Demandes par projet
          </h2>
          {inquiriesByProject.length > 0 ? (
            <InquiriesByProjectChart data={inquiriesByProject} />
          ) : (
            <p className="text-sm text-blanc/50">Aucune demande pour le moment.</p>
          )}
        </div>

        <div className="card-premium p-6">
          <h2 className="mb-4 font-display text-lg font-semibold">
            Biens les plus consultés
          </h2>
          {topProperties.length > 0 ? (
            <TopPropertiesChart data={topProperties} />
          ) : (
            <p className="text-sm text-blanc/50">Pas encore de données de consultation.</p>
          )}
        </div>
      </div>
    </div>
  );
}
