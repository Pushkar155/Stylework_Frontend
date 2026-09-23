import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

import type { Lead, LeadStatus } from "../../redux/leads/leadsTypes";

import { useAppDispatch } from "../../app/hooks";
import { updateLeadStatus } from "../../redux/leads/leadsThunk";
import CommonSelect from "../../components/common/CommonSelect";

interface Props {
  leads: Lead[];
}

const statusColors: Record<LeadStatus, string> = {
  NEW: "blue",
  CONTACTED: "orange",
  QUALIFIED: "purple",
  CONVERTED: "green",
  LOST: "red",
};

const LEAD_STATUS_OPTIONS: {
  label: string;
  value: LeadStatus;
}[] = [
  {
    label: "New",
    value: "NEW",
  },
  {
    label: "Contacted",
    value: "CONTACTED",
  },
  {
    label: "Qualified",
    value: "QUALIFIED",
  },
  {
    label: "Converted",
    value: "CONVERTED",
  },
  {
    label: "Lost",
    value: "LOST",
  },
];

export default function LeadTable({ leads }: Props) {
  const dispatch = useAppDispatch();

  const handleStatusChange = (id: number, status: LeadStatus) => {
    dispatch(
      updateLeadStatus({
        id,
        status,
      }),
    );
  };

  const columns: ColumnsType<Lead> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <span className="font-medium text-slate-800">{name}</span>
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string) => (
        <span className="text-slate-600">{email}</span>
      ),
    },

    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (phone: string) => (
        <span className="text-slate-600">{phone}</span>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: LeadStatus, record: Lead) => (
        <div className="flex items-center gap-2">
          <Tag color={statusColors[status]}>{status}</Tag>

          <CommonSelect
            value={status}
            options={LEAD_STATUS_OPTIONS}
            size="small"
            style={{ minWidth: 50 }}
            onChange={(value: LeadStatus) =>
              handleStatusChange(record.id, value)
            }
          />
        </div>
      ),
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) =>
        new Date(createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },
  ];

  return (
    <Table<Lead>
      rowKey="id"
      columns={columns}
      dataSource={leads}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 50],
      }}
      scroll={{ x: 900 }}
    />
  );
}
