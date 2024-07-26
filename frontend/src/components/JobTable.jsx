import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const JobTable = () => {
  const { adminJobs, searchAdminJobs } = useSelector((store) => store.job);
  const [filterJob, setFilterJob] = useState(adminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filterData =
      adminJobs &&
      adminJobs.filter((job) => {
        if (!searchAdminJobs) return true;
        return (
          job.company?.name
            .toLowerCase()
            .includes(searchAdminJobs.toLowerCase()) ||
          job?.title.toLowerCase().includes(searchAdminJobs.toLowerCase())
        );
      });
    setFilterJob(filterData);
  }, [adminJobs, searchAdminJobs]);

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJob &&
            filterJob.map((job) => (
              <motion.tr
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                exit={{ x: -100 }}
                transition={{ duration: 0.5 }}
                key={job?._id}
              >
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => {
                          console.log(`Navigating to edit job ${job?._id}`); // Debugging
                          navigate(`/admin/jobs/${job?._id}/edit`);
                        }}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() => {
                          console.log(
                            `Navigating to view applicants for job ${job?._id}`
                          ); // Debugging
                          navigate(`/admin/jobs/${job?._id}/applicants`);
                        }}
                        className="flex items-center gap-2 cursor-pointer mt-2"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </motion.tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobTable;
